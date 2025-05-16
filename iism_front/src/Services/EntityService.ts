import {BaseService} from "@/Services/BaseService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError, AxiosResponse} from "axios";


export abstract class EntityService<TEntity> extends  BaseService {
	constructor(protected basePath: string) {
		super();
	}

	async getAllAsync(): Promise<ErrorResponse<TEntity[]>> {
		try {
			const response = await this.axiosInstance.get<TEntity[]>(this.basePath)
			console.log('getAll response', response)
			return this.handleResponse(response)
		} catch (error) {
			console.log('error: ', (error as Error).message)
			return this.handleError(error)
		}
	}

	async getById(id: string): Promise<ErrorResponse<TEntity>> {
		try {
			const response = await this.axiosInstance.get<TEntity>(`${this.basePath}/${id}`)
			console.log('get by id', response)
			return this.handleResponse(response)
		} catch (error) {
			console.log('error: ', (error as Error).message)
			return this.handleError(error)
		}
	}

	async create(item: TEntity): Promise<ErrorResponse<TEntity>> {
		try {
			const response = await this.axiosInstance.post<TEntity>(this.basePath, item)
			console.log('create', response)
			return this.handleResponse(response)
		} catch (error) {
			console.log('error: ', (error as Error).message)
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
			console.log('update', response)
			return this.handleResponse(response)
		} catch (error) {
			console.log('error: ', (error as Error).message)
			return this.handleError(error)
		}
	}

	async delete(id: string): Promise<ErrorResponse<null>> {
		try {
			const response = await this.axiosInstance.delete<null>(`${this.basePath}/${id}`)
			console.log('delete response', response)
			return this.handleResponse(response)
		} catch (error) {
			console.log('error: ', (error as Error).message)
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
