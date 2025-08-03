/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/encrypt.ts
import CryptoJS from "crypto-js";
// shared/constants/crypto.ts
export const ENCRYPTION_KEY = "12345678901234567890123456789012"; // 32 chars
export const IV = "1234567890123456"; // 16 chars

export const encrypt = (data: any) => {
    const strData = JSON.stringify(data);
    const encrypted = CryptoJS.AES.encrypt(strData, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return encrypted.toString();
};

export const decrypt = (cipherText: string) => {
    const decrypted = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY), {
        iv: CryptoJS.enc.Utf8.parse(IV),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
};