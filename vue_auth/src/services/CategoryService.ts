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

    async getById(id: string): Promise<ErrorResponse<ICategory>> {
        try {
            const response = await this.axiosInstance.get<ICategory>(`${this.basePath}/getCategory/${id}`)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async create(item: ICategory): Promise<ErrorResponse<ICategory>> {
        try {
            const response = await this.axiosInstance.post<ICategory>(`${this.basePath}/createCategory`, item)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async update(id: string, item: ICategory): Promise<ErrorResponse<ICategory>> {
        try {
            const payload = {
                id,
                categoryName: item.categoryName,
                categoryDescription: item.categoryDescription
            }

            const response = await this.axiosInstance.put<ICategory>(`${this.basePath}/updateCategory/${id}`, payload)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

    async delete(id: string): Promise<ErrorResponse<null>> {
        try {
            const response = await this.axiosInstance.delete<null>(`${this.basePath}/deleteCategory/${id}`)
            return this.handleResponse(response)
        } catch (error) {
            return this.handleError(error)
        }
    }

}