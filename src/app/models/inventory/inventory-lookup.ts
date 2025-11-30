import { ModelAdapter } from "../core/modelAdapter";

export class InventoryLookup {

    constructor(
        public Id:number,
        public ItemCode:string,
        public ItemName:string
    ){}

}

export const InventoryLookupAdapter:ModelAdapter<InventoryLookup> = {

    adapt(item: any): InventoryLookup {
        return new InventoryLookup(
            item["id"],
            item["item_code"],
            item["item_name"]
        );
    }

}