import type { IUser } from "@/types/Domain/IUser";
import {EntityService} from "@/service/EntityService.ts";
import type {ErrorResponse} from "@/types/Response/ErrorResponse.ts";

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