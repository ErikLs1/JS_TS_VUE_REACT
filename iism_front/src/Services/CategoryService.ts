import {ICategory} from "@/Types/Domain/ICategory";
import {EntityService} from "@/Services/EntityService";
import {ErrorResponse} from "@/Types/Responses/ErrorResponse";
import {CategoryNamesDto} from "@/Types/Responses/CategoryNamesDto";

export class CategoryService extends EntityService<ICategory> {
	constructor() {
		super('categories');
	}

	async getCategoryNames(): Promise<ErrorResponse<CategoryNamesDto>> {
		try {
			const response = await this.axiosInstance.get<CategoryNamesDto>(`${this.basePath}/GetDistinctCategoryNames`)
			return this.handleResponse(response);
		} catch (error) {
			return this.handleError(error)
		}
	}
}
