import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {WarehouseInventoryItemDto} from "@/Types/Responses/WarehouseInventoryItemDto";
import {IOrder} from "@/Types/Domain/IOrder";
import {CreateOrderDto} from "@/Types/Requests/CreateOrderDto";
import {UserOrdersDto} from "@/Types/Responses/UserOrdersDto";
import {PlacedOrderDto} from "@/Types/Responses/PlacedOrderDto";
import {ChangeOrderStatusDto} from "@/Types/Requests/ChangeOrderStatusDto";


export class OrderService extends EntityService<IOrder> {
	constructor() {
		super('Orders');
	}

	async PlaceTheOrder(entity: CreateOrderDto): Promise<ErrorResponse<WarehouseInventoryItemDto[]>> {
		try {
			const response = await this.axiosInstance.post<WarehouseInventoryItemDto[]>(
				`${this.basePath}/PlaceTheOrder`, entity)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}

	async GetUsersOrders(): Promise<ErrorResponse<UserOrdersDto[]>> {
		try {
			const response = await this.axiosInstance.get<UserOrdersDto[]>(
				`${this.basePath}/GetUsersOrders`)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}

	async GetAllPlacedOrder(): Promise<ErrorResponse<PlacedOrderDto[]>> {
		try {
			const response = await this.axiosInstance.get<PlacedOrderDto[]>(
				`${this.basePath}/GetAllPlacedOrder`)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}

	async ChangeOrderStatus(dto: ChangeOrderStatusDto): Promise<ErrorResponse<IOrder>> {
		try {
			const response = await this.axiosInstance.put(
				`${this.basePath}/ChangeOrderStatus`, dto)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}
}
