import {SupplierDto} from "@/Types/Responses/SupplierDto";
import {ProductDto} from "@/Types/Responses/ProductDto";

export interface ProductSupplierDto {
	id: string;
	supplierId: string;
	productId: string;
	unitCost: number;
	supplier: SupplierDto;
	product: ProductDto;
}
