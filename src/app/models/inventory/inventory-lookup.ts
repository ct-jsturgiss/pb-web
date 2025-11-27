import { ModelAdapter } from "../core/modelAdapter";

export class InventoryLookup {

    constructor(
        public Id:number,
        public ItemCode:string,
        public ItemName:string
    ){}

}

export class InventoryLookupAdapter implements ModelAdapter<InventoryLookup> {

    adapt(item: any): InventoryLookup {
        return new InventoryLookup(1,item["item_code"],item["item_name"]);
    }

}