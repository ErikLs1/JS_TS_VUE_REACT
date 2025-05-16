import {BaseService} from "@/Services/BaseService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {LoginResponse} from "@/Types/Responses/LoginResponse";
import {AxiosError} from "axios";
import {RegisterRequest} from "@/Types/Requests/RegisterRequest";
import {LoginRequest} from "@/Types/Requests/LoginRequest";
import {LogoutRequest} from "@/Types/Requests/LogoutRequest";
import {useContext} from "react";
import {AccountContext} from "@/Context/AccountContext";

// TODO REFACTORING
export class AccountService extends BaseService {
	private clearAccountInfo = useContext(AccountContext)!.setAccountInfo!;

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
