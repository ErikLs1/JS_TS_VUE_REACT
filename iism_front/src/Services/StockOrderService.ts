import {EntityService} from "@/Services/EntityService";
import {IStockOrder} from "@/Types/Domain/IStockOrder";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {CreateStockOrderRequest} from "@/Types/Requests/CreateStockOrderRequest";

export class StockOrderService extends EntityService<IStockOrder> {
	constructor() {
		super('StockOrders');
	}

	async PlaceStockOrder(dto: CreateStockOrderRequest): Promise<ErrorResponse<any>> {
		try {
			const response = await this.axiosInstance.post(`${this.basePath}/PlaceStockOrder`, dto)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}
}
