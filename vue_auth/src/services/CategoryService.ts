import axios from "axios";
import type {ICategory} from "@/domain/ICategory.ts";
import type {IResultObject} from "@/types/IResultObject.ts";

export abstract class CategoryService {
    private static axios = axios.create({
        baseURL: "http://localhost:5176/api/v1.0/",
        headers: {
            "Content-Type": "application/json",
        }
    })

    static async getAllAsync(): Promise<IResultObject<ICategory[]>> {
        const url = "Categories/GetCategories";
        try {
            const response = await this.axios.get<ICategory[]>(url);

            console.log('getAll response', response);
            if (response.status <= 300) {
                return {
                    data: response.data
                };
            }
            return {
                errors: [response.status.toString() + " " + response.statusText.trim()]
            };
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return {
                errors: [JSON.stringify(error)]
            };
        }
    }
}