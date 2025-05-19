import {OrderProductDto} from "@/Types/Responses/OrderProductDto";

export interface UserOrdersDto {
	orderTotalPrice: number;
	orderShippingAddress: string;
	orderStatus: string;
	products: OrderProductDto[];
}
