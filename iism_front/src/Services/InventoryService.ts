import {EntityService} from "@/Services/EntityService";
import {IUser} from "@/Types/Domain/IUser";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError} from "axios";
import {IInventory} from "@/Types/Domain/IInventory";
import {WarehouseInventoryItemDto} from "@/Types/Responses/WarehouseInventoryItemDto";

export class InventoryService extends EntityService<IInventory> {
	constructor() {
		super('Inventories');
	}

	async GetProductsForWarehouse(warehouseId: string): Promise<ErrorResponse<WarehouseInventoryItemDto[]>> {
		try {
			const response = await this.axiosInstance.get<WarehouseInventoryItemDto[]>(
				`${this.basePath}/GetProductsForWarehouse`,
				{ params: warehouseId})

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
