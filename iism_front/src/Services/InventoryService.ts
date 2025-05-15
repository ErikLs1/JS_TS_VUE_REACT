import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError} from "axios";
import {IInventory} from "@/Types/Domain/IInventory";
import {WarehouseInventoryItemDto} from "@/Types/Responses/WarehouseInventoryItemDto";
import {InventoryProductsDto} from "@/Types/Responses/InventoryProductsDto";

export class InventoryService extends EntityService<IInventory> {
	constructor() {
		super('Inventories');
	}

	async GetProductsForWarehouse(warehouseId: string): Promise<ErrorResponse<WarehouseInventoryItemDto[]>> {
		try {
			const response = await this.axiosInstance.get<WarehouseInventoryItemDto[]>(
				`${this.basePath}/GetProductsForWarehouse`,
				{params : { warehouseId }})

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

	async GetInventoryProducts(): Promise<ErrorResponse<InventoryProductsDto[]>> {
		try {
			const response = await this.axiosInstance.get<InventoryProductsDto[]>(
				`${this.basePath}/GetInventoryProducts`)

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

	async GetFilteredInventoryProducts(
		minPrice?: number,
		maxPrice?: number,
		category?: string,
		productName?: string,
	): Promise<ErrorResponse<InventoryProductsDto[]>> {
		try {
			const response = await this.axiosInstance.get<InventoryProductsDto[]>(
				`${this.basePath}/GetFilteredInventoryProducts`,
				{params : { minPrice, maxPrice, category, productName }})

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
