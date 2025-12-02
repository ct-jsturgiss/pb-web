import { ModelAdapter } from "../core/modelAdapter";

export class InventoryLookup {

    constructor(
        public id:number,
        public itemCode:string,
        public itemName:string,
        public pathId:string
    ){}

}

export const InventoryLookupAdapter:ModelAdapter<InventoryLookup> = {

    adapt(item: any): InventoryLookup {
        return new InventoryLookup(
            item["id"],
            item["item_code"],
            item["item_name"],
            item["path_id"]
        );
    }

}