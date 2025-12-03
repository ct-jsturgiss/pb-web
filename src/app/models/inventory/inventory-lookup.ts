import { ModelAdapter } from "../core/modelAdapter";

export class InventoryLookup {

    public supplierItemCode:string|null = null;
    public manufacturerName:string|null = null;
    public manufacturerDescription:string|null = null;
    public listName:string|null = null;

    constructor(
        public id:number,
        public itemCode:string,
        public itemName:string,
        public pathId:string
    ){}

}

export const InventoryLookupAdapter:ModelAdapter<InventoryLookup> = {

    adapt(item: any): InventoryLookup {
        let ivl = new InventoryLookup(
            item["id"],
            item["item_code"],
            item["item_name"],
            item["path_id"]
        );

        ivl.supplierItemCode = item["supplier_item_code"];
        ivl.manufacturerName = item["manufacturer_name"];
        ivl.manufacturerDescription = item["manufacturer_description"];
        ivl.listName = item["list_name"];

        return ivl;
    }

}