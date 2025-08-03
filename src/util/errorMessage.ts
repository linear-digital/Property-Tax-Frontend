/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorMessage = (error: any) => {
    if (error.response) {
        return error.response.data.message;
    }
    else if (error.request) {
        return error.request;
    }
    else {
        return error.message || 'Something went wrong';
    }
};