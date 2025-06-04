import {EntityService} from "@/services/EntityService";
import {ErrorResponseDto} from "@/types/Response/ErrorResponseDto";
import {ISchool} from "@/types/Domain/ISchool";
import {AssignSemesterSubjectDto} from "@/types/Request/AssignSemesterSubjectDto";
import {SemesterSubjectDto} from "@/types/Request/SemesterSubjectDto";

export class SemesterSubjectService extends EntityService<ISchool> {
    constructor() {
        super('semesterSubject');
    }

    async GetSemesterSubjectsForTeacher(): Promise<ErrorResponseDto<SemesterSubjectDto[]>> {
        const url = 'semesterSubject/GetSemesterSubjectsForTeacher'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.get<SemesterSubjectDto[]>(url,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async GetSemesterSubjectForCurrentTeacher(): Promise<ErrorResponseDto<SemesterSubjectDto[]>> {
        const url = 'semesterSubject/GetSemesterSubjectForCurrentTeacher'

        try {
            const token = localStorage.getItem("_jwt");
            const response = await this.axiosInstance.get<SemesterSubjectDto[]>(url,
                {
                    headers: { Authorization: token ? `Bearer ${token}` : "" }
                })
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error);
        }
    }

    async AssignSemesterSubject(school: AssignSemesterSubjectDto): Promise<ErrorResponseDto<any>> {
        const url = 'semesterSubject/AssignSemesterSubject'

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

    async GetAvailableSubjectsForEnrollment(): Promise<ErrorResponseDto<SemesterSubjectDto[]>> {
        const url = "semesterSubject/GetAvailableSubjectsForEnrollment";
        const token = localStorage.getItem("_jwt");
        const resp = await this.axiosInstance.get<SemesterSubjectDto[]>(url, {
            headers: { Authorization: token ? `Bearer ${token}` : "" },
        });
        return this.handleResponse(resp);
    }

}