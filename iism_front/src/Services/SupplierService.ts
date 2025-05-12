import {EntityService} from "@/Services/EntityService";
import {ISupplier} from "@/Types/Domain/ISupplier";

export class SupplierService extends EntityService<ISupplier> {
	constructor() {
		super('suppliers');
	}
}
