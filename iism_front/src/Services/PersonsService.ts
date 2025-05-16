import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
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
			return this.handleResponse(response)
		} catch (error) {
			return this.handleError(error);
		}
	}
}
