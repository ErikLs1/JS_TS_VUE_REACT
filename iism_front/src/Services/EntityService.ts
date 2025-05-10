import {BaseService} from "@/Services/BaseService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError} from "axios";

export abstract class EntityService<TEntity> extends  BaseService {
	constructor(private basePath: string) {
		super();
	}

	async getAllAsync(): Promise<ErrorResponse<TEntity[]>> {
		try {
			const response = await this.axiosInstance.get<TEntity[]>(this.basePath)

			console.log('getAll response', response)

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
		} catch (error) {
			console.log('error: ', (error as Error).message)
			return {
				statusCode: (error as AxiosError)?.status,
				errors: [(error as AxiosError).code ?? ""],
			}
		}
	}
}
