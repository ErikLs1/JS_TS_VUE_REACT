import {OrderProductDto} from "@/Types/Responses/OrderProductDto";

export interface PlacedOrderDto {
	orderId: string;
	customerFirstName: string;
	customerLastName: string;
	totalNumberOfProducts: number;
	orderedAt: string;
	orderStatus: string;
	products: OrderProductDto[];
}
