import axios, {type AxiosInstance, type AxiosResponse} from "axios";
import type {LoginResponse} from "@/types/Response/LoginResponse.ts";
import {useAccountStore} from "@/stores/userStore.ts";

let refreshPromise: Promise<AxiosResponse<LoginResponse>> |  null = null;

export abstract class BaseService {
    protected axiosInstance: AxiosInstance;
    protected accountStore = useAccountStore();

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: "http://localhost:5094/api/v1.0/",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            }
        });

        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("_jwt");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        this.axiosInstance.interceptors.response.use(
            (response) => {
                return response;
            },

            async (error) => {
                const originalRequest = error.config;
                if (error.response && error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    if (!refreshPromise) {
                        refreshPromise = this.axiosInstance.post<LoginResponse>(
                            '/Account/RenewRefreshToken',
                            {
                                jwt: localStorage.getItem('_jwt'),
                                refreshToken: localStorage.getItem('_refreshToken')
                            }
                        ).finally(() => {
                            refreshPromise = null;
                        });
                    }

                    try {
                        const { data } = await refreshPromise;
                        localStorage.setItem('_jwt', data.jwt);
                        localStorage.setItem('_refreshToken', data.refreshToken);
                        localStorage.setItem('_role', data.role);
                        this.accountStore.setAuth(data);
                        originalRequest.headers!.Authorization = `Bearer ${data.jwt}`;
                        return this.axiosInstance(originalRequest);
                    } catch (e) {
                        return Promise.reject(e);
                    }
                }

                return Promise.reject(error);
            }
        );
    }
}
