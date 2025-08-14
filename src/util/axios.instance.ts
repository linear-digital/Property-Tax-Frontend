/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { decrypt, encrypt } from "./encrypt";
import toast from "react-hot-toast";
import { errorMessage } from "./errorMessage";
// const baseUrl = "http://localhost:4000/api";
const baseUrl = "https://property.genzit.xyz/api";
import Cookies from "js-cookie";
const api = axios.create({
    baseURL: baseUrl,
});

type FetcherArgs = {
    path: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    params?: any
};
const token = Cookies.get("token");
export const fetcher = async ({ path, method = "GET", body, params }: FetcherArgs) => {
    const token = Cookies.get("token");
    try {
        const response = await api({
            url: path, // ✅ no need to prepend baseUrl since api already has it
            method,
            data: body ? { payload: encrypt(body) } : undefined,
            params: params || undefined,
            headers: {
                token: token || ""
            },
            validateStatus: (status) => status < 500 // Let 4xx pass for custom handling
        });

        // ✅ Handle 304 Not Modified (return null or cached data)
        if (response.status === 304) {
            console.warn(`304 Not Modified: ${path}`);
            return null;
        }

        // ✅ Decrypt payload if exists
        if (response.data?.payload) {
            try {
                return decrypt(response.data.payload);
            } catch (decryptErr) {
                console.error("Decryption failed", decryptErr);
                return null;
            }
        }

        // ✅ Return raw data if no encryption
        return response.data;
    } catch (err: any) {
        // ✅ If server sent encrypted error
        if (err.response?.data?.payload) {
            try {
                const decryptedError = decrypt(err.response.data.payload);
                toast.error(decryptedError.message || "Something went wrong");
                throw decryptedError;
            } catch {
                toast.error("Error decrypting server message");
                throw err;
            }
        }

        // ✅ If axios network error or no response
        if (err.code === "ERR_NETWORK") {
            toast.error("Network error — please check your internet connection");
        } else {
            toast.error(err.message || "Unknown error");
        }

        throw err;
    }
};
export const logOut = async () => {
    try {
        Cookies.remove('token')
        window.location.pathname = "/login"
    } catch (error: any) {
        toast.error(errorMessage(error));
        return null
    }
}
export const checkToken = async () => {
    try {
        const token: string = Cookies.get("token") || "";
        if (token && token.length < 10) {
            logOut()
            return null
        }
        if (!token) {
            return null
        }
        const res = await fetcher({
            path: "/user/me"
        });
        return res
    } catch (error: any) {
        console.error(errorMessage(error));
        logOut()
        return null
    }
};



export default api;