/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { decrypt, encrypt } from "./encrypt";
import toast from "react-hot-toast";
import { errorMessage } from "./errorMessage";
const baseUrl = "https://property.genzit.xyz/api";
import Cookies from "js-cookie";
const api = axios.create({
    baseURL: "https://property.genzit.xyz/api",
    withCredentials: true, // ✅ include cookies on all requests
});


type FetcherArgs = {
    path: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    params?: any
};

export const fetcher = async ({ path, method = "GET", body, params }: FetcherArgs) => {
    try {
        const response = await api({
            url: baseUrl + path,
            method,
            data: body ? { payload: encrypt(body) } : undefined,
            params: params ? params : undefined
        });

        if (response.data?.payload) {
            return decrypt(response.data.payload);
        }

        return response.data;
    } catch (err: any) {
        if (err.response?.data?.payload) {
            const decryptedError = decrypt(err.response.data.payload);
            throw decryptedError;
        }
        throw err;
    }
};
export const logOut = async () => {
    try {
        await fetcher({
            path: "/user/logout"
        });
        window.location.pathname = "/login"
    } catch (error: any) {
        toast.error(errorMessage(error));
        return null
    }
}
export const checkToken = async () => {
    try {
        const token = Cookies.get("token");
        if (!token) {
            return null
        }
        const res = await fetcher({
            path: "/user/me"
        });
        return res
    } catch (error: any) {
        console.error(errorMessage(error));
        // logOut()
        return null
    }
};



export default api;