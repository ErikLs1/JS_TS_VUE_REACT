import {EntityService} from "@/services/EntityService";
import {ErrorResponseDto} from "@/types/Response/ErrorResponseDto";
import {SchoolListDto} from "@/types/Response/SchoolListDto";
import {ISchool} from "@/types/Domain/ISchool";
import {AssignSchoolDto} from "@/types/Request/AssignSchoolDto";

export class SchoolService extends EntityService<ISchool> {
    constructor() {
        super('school');
    }

    async getAllSchools(): Promise<ErrorResponseDto<SchoolListDto[]>> {
        const url = 'school/getAllSchools'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.get<SchoolListDto[]>(url,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async assignSchool(school: AssignSchoolDto): Promise<ErrorResponseDto<any>> {
        const url = 'school/assignSchool'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.post<any>(url, school,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }
}