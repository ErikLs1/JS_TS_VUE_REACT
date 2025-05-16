import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
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
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}

	async GetInventoryProducts(): Promise<ErrorResponse<InventoryProductsDto[]>> {
		try {
			const response = await this.axiosInstance.get<InventoryProductsDto[]>(
				`${this.basePath}/GetInventoryProducts`)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
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
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}
}
