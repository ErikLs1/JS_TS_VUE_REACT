import {OrderProductDto} from "@/Types/Responses/OrderProductDto";

export interface UserOrdersDto {
	orderTotalPrice: number;
	orderShippingAddress: number;
	orderStatus: number;
	products: OrderProductDto[];
}
