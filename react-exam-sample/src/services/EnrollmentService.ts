import {EntityService} from "@/services/EntityService";
import {ErrorResponseDto} from "@/types/Response/ErrorResponseDto";
import {ISchool} from "@/types/Domain/ISchool";
import {AssignSemesterSubjectDto} from "@/types/Request/AssignSemesterSubjectDto";
import {SemesterSubjectDto} from "@/types/Request/SemesterSubjectDto";
import {EnrollmentForTeacherDto} from "@/types/Response/EnrollmentForTeacherDto";
import {RequestEnrollmentDto} from "@/types/Request/RequestEnrollmentDto";
import {SetEnrollmentStatusDto} from "@/types/Request/SetEnrollmentStatusDto";
import {EnrollmentDto} from "@/types/Response/EnrollmentDto";

export class EnrollmentService extends EntityService<ISchool> {
    constructor() {
        super('enrollment');
    }

    async GetEnrollmentsForTeacher(): Promise<ErrorResponseDto<EnrollmentForTeacherDto[]>> {
        const url = 'enrollment/GetEnrollmentsForTeacher'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.get<EnrollmentForTeacherDto[]>(url,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async GetMyEnrollments(): Promise<ErrorResponseDto<EnrollmentDto[]>> {
        const url = 'enrollment/GetMyEnrollments'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.get<EnrollmentDto[]>(url,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async SetEnrollmentStatus(request: SetEnrollmentStatusDto): Promise<ErrorResponseDto<any>> {
        const url = 'enrollment/SetEnrollmentStatus'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.post<any>(url, request,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async RequestEnrollment(request: RequestEnrollmentDto): Promise<ErrorResponseDto<any>> {
        const url = 'enrollment/RequestEnrollment'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.post<any>(url, request,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

}