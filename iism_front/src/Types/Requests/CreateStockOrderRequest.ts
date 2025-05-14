import {StockOrderItemRequest} from "@/Types/Requests/StockOrderItemRequest";

export interface CreateStockOrderRequest {
	supplierId: string;
	warehouseId: string;
	products: StockOrderItemRequest[];
}
