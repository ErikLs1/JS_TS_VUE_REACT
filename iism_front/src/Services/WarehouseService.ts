import {EntityService} from "@/Services/EntityService";
import {IWarehouse} from "@/Types/Domain/IWarehouse";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {WarehouseFiltersResponse} from "@/Types/Responses/WarehouseFiltersResponse";


export class WarehouseService extends EntityService<IWarehouse> {
	constructor() {
		super('warehouses');
	}

	async getFilters(): Promise<ErrorResponse<WarehouseFiltersResponse>> {
		try {
			const response = await this.axiosInstance.get<WarehouseFiltersResponse>(`${this.basePath}/GetFilters`)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error)
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
			return this.handleResponse(response)
		} catch (error) {
			return this.handleError(error);
		}
	}

	async create(item: IWarehouse): Promise<ErrorResponse<IWarehouse>> {
		try {
			const response = await this.axiosInstance.post<IWarehouse>(`${this.basePath}/CreateWarehouse`, item)
			return this.handleResponse(response)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async update(id: string, item: IWarehouse): Promise<ErrorResponse<IWarehouse>> {
		try {
			const token = localStorage.getItem("_jwt");
			const response = await this.axiosInstance.put<IWarehouse>(`${this.basePath}/UpdateWarehouse/${id}`, item,
				{
					headers: { Authorization: token ? `Bearer ${token}` : "" }
				})
			return this.handleResponse(response)
		} catch (error) {
			return this.handleError(error)
		}
	}

	async delete(id: string): Promise<ErrorResponse<null>> {
		try {
			const response = await this.axiosInstance.delete<null>(`${this.basePath}/DeleteWarehouse/${id}`)
			return this.handleResponse(response)
		} catch (error) {
			return this.handleError(error)
		}
	}
}
