import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError} from "axios";
import {IUser} from "@/Types/Domain/IUser";

export class PersonsService extends EntityService<IUser> {
	constructor() {
		super('persons');
	}

	async getProfileInfo(): Promise<ErrorResponse<IUser>> {
		const url = 'persons/getProfileInfo'

		try {
			const token = localStorage.getItem("_jwt");
			const response = await this.axiosInstance.get<IUser>(url,
				{
					headers: { Authorization: token ? `Bearer ${token}` : "" }
				})
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
