import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {IInventory} from "@/Types/Domain/IInventory";
import {WarehouseInventoryItemDto} from "@/Types/Responses/WarehouseInventoryItemDto";
import {InventoryProductsDto} from "@/Types/Responses/InventoryProductsDto";
import {PagedData} from "@/Types/Responses/PagedData";

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
		pageIndex: number,
		pageSize: number,
		minPrice?: number,
		maxPrice?: number,
		category?: string,
		productName?: string,
	): Promise<ErrorResponse<PagedData<InventoryProductsDto>>> {
		const params: Record<string, any> = { pageIndex, pageSize };
		if (minPrice !== undefined) params.minPrice = minPrice;
		if (maxPrice !== undefined) params.maxPrice = maxPrice;
		if (category) params.category = category;
		if (productName) params.productName = productName;

		try {
			const response = await this.axiosInstance.get<PagedData<InventoryProductsDto>>(
				`${this.basePath}/GetFilteredInventoryProducts`,
				{ params })
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error);
		}
	}
}
