import {EntityService} from "@/Services/EntityService";
import {IWarehouse} from "@/Types/Domain/IWarehouse";

export class WarehouseService extends EntityService<IWarehouse> {
	constructor() {
		super('warehouses');
	}
}
