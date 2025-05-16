import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {WarehouseInventoryItemDto} from "@/Types/Responses/WarehouseInventoryItemDto";
import {AxiosError} from "axios";
import {IOrder} from "@/Types/Domain/IOrder";
import {CreateOrderDto} from "@/Types/Requests/CreateOrderDto";
import {UserOrdersDto} from "@/Types/Responses/UserOrdersDto";

export class OrderService extends EntityService<IOrder> {
	constructor() {
		super('Orders');
	}

	async PlaceTheOrder(entity: CreateOrderDto): Promise<ErrorResponse<WarehouseInventoryItemDto[]>> {
		try {
			const response = await this.axiosInstance.post<WarehouseInventoryItemDto[]>(
				`${this.basePath}/PlaceTheOrder`, entity)

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

	async GetUsersOrders(): Promise<ErrorResponse<UserOrdersDto[]>> {
		try {
			const response = await this.axiosInstance.get<UserOrdersDto[]>(
				`${this.basePath}/GetUsersOrders`)

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
			return this.handleError(error)
		}
	}
}
