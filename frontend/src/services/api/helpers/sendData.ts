import {axiosInstance} from "../apiOperations.ts";

type AllowedAxiosMethods = 'post' | 'put' | 'patch';

export const sendData = async <T, Response>(data: T, method: AllowedAxiosMethods, url: string): Promise<Response> => {
    const response = await axiosInstance[method]<Response>(url,
        data
    )
    return response.data
}
