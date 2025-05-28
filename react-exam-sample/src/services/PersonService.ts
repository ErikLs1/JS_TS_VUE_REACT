import {EntityService} from "@/services/EntityService";
import {IUser} from "@/types/Domain/IUser";
import {ErrorResponseDto} from "@/types/Response/ErrorResponseDto";

export class PersonsService extends EntityService<IUser> {
    constructor() {
        super('persons');
    }

    async getProfileInfo(): Promise<ErrorResponseDto<IUser>> {
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