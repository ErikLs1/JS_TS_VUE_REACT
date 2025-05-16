import {EntityService} from "@/Services/EntityService";
import {IProductSupplier} from "@/Types/Domain/IProductSupplier";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {AxiosError} from "axios";
import {SupplierProductFilterResponse} from "@/Types/Responses/SupplierProductFilterResponse";
import {PagedData} from "@/Types/Responses/PagedData";
import {ProductSupplierDto} from "@/Types/Responses/ProductSupplierDto";

// TODO REFACTORING
export class ProductSuppliersService extends EntityService<IProductSupplier> {
	constructor() {
		super('ProductSuppliers');
	}

	async getFilters(): Promise<ErrorResponse<SupplierProductFilterResponse>> {
		try {
			const response = await this.axiosInstance.get<SupplierProductFilterResponse>(`${this.basePath}/GetFilters`)

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

	async getFilteredProductSuppliers(
		pageIndex: number,
		pageSize: number,
		city?: string,
		state?: string,
		country?: string,
		category?: string,
		supplier?: string,
		): Promise<ErrorResponse<PagedData<ProductSupplierDto>>> {

		const filterParams: Record<string, any> = { pageIndex, pageSize };
		if (city) filterParams.city = city;
		if (state) filterParams.state = state;
		if (country) filterParams.country = country;
		if (category) filterParams.category = category;
		if (supplier) filterParams.supplier = supplier;

		try {
			const response = await this.axiosInstance.get<PagedData<ProductSupplierDto>>(
				`${this.basePath}/GetFilteredProductSuppliers`,
				{ params: filterParams })

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
