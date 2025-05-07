import {ICategory} from "@/Types/Domain/ICategory";
import {EntityService} from "@/Services/EntityService";

export class CategoryService extends EntityService<ICategory> {
	constructor() {
		super('category');
	}
}
