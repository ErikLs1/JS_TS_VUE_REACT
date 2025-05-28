import {LoginRequestDto} from "@/types/Request/LoginRequestDto";
import {ErrorResponseDto} from "@/types/Response/ErrorResponseDto";
import {LoginResponseDto} from "@/types/Response/LoginResponseDto";
import {AccountContext} from "@/context/AccountContext";
import {useContext} from "react";
import {BaseService} from "@/services/BaseService";
import {AxiosError} from "axios";
import {RegisterRequestDto} from "@/types/Request/RegisterRequestDto";
import {LogoutRequestDto} from "@/types/Request/LogoutRequestDto";

export class AccountService extends BaseService {
    private clearAccountInfo = useContext(AccountContext)!.setAccountInfo!;

    async loginAsync(req: LoginRequestDto): Promise<ErrorResponseDto<LoginResponseDto>> {
        const url = 'account/login'

        try {
            const response = await this.axiosInstance.post<LoginResponseDto>(url + "?jwtExpiresInSeconds=5", req)

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

    async logoutAsync(req: LogoutRequestDto): Promise<ErrorResponseDto<void>> {
        const url = 'account/logout'

        try {

            const response = await this.axiosInstance.post<void>(url, req)

            if (response.status >= 200 && response.status < 300) {
                this.clearAccountInfo!({});
                localStorage.removeItem("_jwt");
                localStorage.removeItem("_refreshToken");
                localStorage.removeItem("_role");
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

    async registerAsync(req: RegisterRequestDto): Promise<ErrorResponseDto<LoginResponseDto>> {
        const url = 'account/register'

        try {
            const response = await this.axiosInstance.post<LoginResponseDto>(url, req)

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
