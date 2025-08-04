/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorMessage = (error: any) => {
    if (error.response) {
        return error.response.data.message || error.response.data.error || 'Something went wrong';
    }
    else if (error.request) {
        return error.request;
    }
    else {
        return error.message || 'Something went wrong';
    }
};