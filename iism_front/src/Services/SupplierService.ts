import {EntityService} from "@/Services/EntityService";
import {IWarehouse} from "@/Types/Domain/IWarehouse";

export class SupplierService extends EntityService<ISupplier> {
	constructor() {
		super('suppliers');
	}
