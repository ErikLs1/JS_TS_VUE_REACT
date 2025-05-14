import {EntityService} from "@/Services/EntityService";
import {IStockOrder} from "@/Types/Domain/IStockOrder";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {SupplierProductFilterResponse} from "@/Types/Responses/SupplierProductFilterResponse";
import {AxiosError} from "axios";
import {CreateStockOrderRequest} from "@/Types/Requests/CreateStockOrderRequest";

export class StockOrderService extends EntityService<IStockOrder> {
	constructor() {
		super('StockOrders');
	}


	async PlaceStockOrder(dto: CreateStockOrderRequest): Promise<ErrorResponse<any>> {
		try {
			const response = await this.axiosInstance.post(`${this.basePath}/PlaceStockOrder`, dto)

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
