import type { RegisterRequest } from "@/types/Request/RefisterRequest";
import type { LogoutRequest } from "@/types/Request/LogoutRequest";
import type { LoginRequest } from "@/types/Request/LoginRequest";
import type { ErrorResponse } from "@/types/Response/ErrorResponse";
import type { LoginResponse } from "@/types/Response/LoginResponse";
import { BaseService } from "./BaseService";
import type {AxiosError} from "axios";

export class AccountService extends BaseService {

    async loginAsync(req: LoginRequest): Promise<ErrorResponse<LoginResponse>> {
        const url = 'account/login'

        try {
            const response = await this.axiosInstance.post<LoginResponse>(url + "?jwtExpiresInSeconds=5", req)

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

    async logoutAsync(req: LogoutRequest): Promise<ErrorResponse<void>> {
        const url = 'account/logout'

        try {

            const response = await this.axiosInstance.post<void>(url, req)

            if (response.status >= 200 && response.status < 300) {
                this.accountStore.clearAuth();
                return { statusCode: response.status };
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

    async registerAsync(req: RegisterRequest): Promise<ErrorResponse<LoginResponse>> {
        const url = 'account/register'

        try {
            const response = await this.axiosInstance.post<LoginResponse>(url, req)

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
