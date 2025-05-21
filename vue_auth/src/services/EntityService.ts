import {BaseService} from "@/services/BaseService.ts";
import type {ErrorResponse} from "@/types/ErrorResponse.ts";
import type {AxiosError, AxiosResponse} from "axios";

export abstract class EntityService<TEntity> extends  BaseService {
    constructor(protected basePath: string) {
        super();
    }

    async getAllAsync(): Promise<ErrorResponse<TEntity[]>> {
        try {
            const response = await this.axiosInstance.get<TEntity[]>(this.basePath)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async getById(id: string): Promise<ErrorResponse<TEntity>> {
        try {
            const response = await this.axiosInstance.get<TEntity>(`${this.basePath}/${id}`)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async create(item: TEntity): Promise<ErrorResponse<TEntity>> {
        try {
            const response = await this.axiosInstance.post<TEntity>(this.basePath, item)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async update(id: string, item: TEntity): Promise<ErrorResponse<TEntity>> {
        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.put<TEntity>(`${this.basePath}/${id}`, item,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async delete(id: string): Promise<ErrorResponse<null>> {
        try {
            const response = await this.axiosInstance.delete<null>(`${this.basePath}/${id}`)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    protected handleError(e: unknown): ErrorResponse<any> {
        const err = e as AxiosError;
        return {
            statusCode: err.response?.status,
            errors:[err.code ?? ""],}
    }

    protected handleResponse<U>(response: AxiosResponse<U>): ErrorResponse<U> {
        if (response.status <= 300) {
            return {
                statusCode: response.status,
                data: response.data
            }
        }

        return {
            statusCode: response.status,
            errors: [(response.status.toString() + ' ' + response.statusText).trim()]
        }
    }
}
