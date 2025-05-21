import type {ICategory} from "@/domain/ICategory.ts";
import {EntityService} from "@/services/EntityService.ts";
import type {ErrorResponse} from "@/types/ErrorResponse.ts";

export class CategoryService extends EntityService<ICategory> {
    constructor() {
        super('categories');
    }

    async getAllAsync(): Promise<ErrorResponse<ICategory[]>> {
        const response = await this.axiosInstance.get<ICategory[]>(`${this.basePath}/getCategories`)
        return this.handleResponse(response)
    }
}