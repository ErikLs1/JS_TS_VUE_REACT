import {EntityService} from "@/Services/EntityService";
import {IWarehouse} from "@/Types/Domain/IWarehouse";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError} from "axios";
import {WarehouseFiltersResponse} from "@/Types/Responses/WarehouseFiltersResponse";

export class WarehouseService extends EntityService<IWarehouse> {
	constructor() {
		super('warehouses');
	}

	async getFilters(): Promise<ErrorResponse<WarehouseFiltersResponse>> {
		try {
			const response = await this.axiosInstance.get<WarehouseFiltersResponse>(`${this.basePath}/GetFilters`)

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

	async getFilteredWarehouses(filters: {
		street?: string;
		city?: string;
		state?: string;
		country?: string;
	}): Promise<ErrorResponse<IWarehouse[]>> {
		try {
			const response = await this.axiosInstance.get<IWarehouse[]>(
				`${this.basePath}/GetFilteredWarehouses`,
				{ params: filters })

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
