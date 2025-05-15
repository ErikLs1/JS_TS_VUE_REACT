import {CreateOrderProductDto} from "@/Types/Requests/CreateOrderProductDto";

export interface CreateOrderDto {
	shippingAddress: string;
	paymentMethod: string;
	products: CreateOrderProductDto[];
}
