/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { decrypt, encrypt } from "./encrypt";
import toast from "react-hot-toast";
import { errorMessage } from "./errorMessage";
import Cookies from "js-cookie";
const mode: string = 'production' // 'development' or 'production'
// 🔹 Dynamic base URL handling
const getBaseUrl = (): string => {
    const branches: any = {
        "afgoye": "s1",
        "baidoa": "s2",
        "lafoole": "s3",
        "huddur": "s4",
        "diinsoor": "s5",
        "baraawe": "s6",
        "tawakal": "s7",
        "jowhar": "s8",
    }

    const host = window.location.hostname.split(".")[0];
    const branch = host !== "localhost" ? branches[host] : "s1";
    return mode === 'development'
        ? "http://localhost:4000/api"
        : `https://${branch}.swstaxpropertypro.com/api`;
};

const api = axios.create({
    baseURL: getBaseUrl(),
});



// ✅ Common helper for token
const getToken = () => Cookies.get("token") || "";

type FetcherArgs = {
    path: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    body?: any;
    params?: any;
    config?: any;
};

// 🔹 Improved fetcher with generics
export const fetcher = async <T = any>({
    path,
    method = "GET",
    body,
    params,
    config,
}: FetcherArgs): Promise<T> => {
    try {
        const response: any = await api({
            url: path,
            method,
            data: body ? { payload: encrypt(body) } : undefined,
            params,
            headers: { token: getToken() },
            ...config,
        });

        if (response.status === 304) {
            console.warn(`304 Not Modified: ${path}`);
            return Promise.reject(new Error("Not Modified"));
        }

        // ✅ Try decrypt, fallback to raw
        if (response.data?.payload) {
            try {
                return decrypt(response.data.payload) as T;
            } catch (err) {
                console.error("Decryption failed:", err);
                throw new Error("Failed to process server response");
            }
        }

        return response.data as T;
    } catch (err: any) {
        // 🔹 Handle encrypted error response
        if (err.response?.data?.payload) {
            try {
                const decryptedError = decrypt(err.response.data.payload);
                throw decryptedError;
            } catch {
                toast.error("Error decrypting server message");
            }
        }

        if (err.code === "ERR_NETWORK") {
            toast.error("Network error — check your internet connection");
        } else {
            toast.error(err.message || "Unexpected error");
        }

        throw err;
    }
};

// 🔹 Centralized logout
export const logOut = () => {
    Cookies.remove("token");
    window.location.replace("/login");
};

// 🔹 Token check + validation
export const checkToken = async () => {
    const token = getToken();

    if (!token) {
        // logOut();
        return null;
    }
    if (token.length < 10) {
        logOut();
        return null;
    }

    try {
        const user = await fetcher({ path: "/user/me", });
        return user
    } catch (error: any) {
        console.error("Token validation failed:", errorMessage(error));
        logOut();
        return null;
    }
};

export default api;