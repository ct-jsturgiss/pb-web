import { ModelAdapter } from "../core/modelAdapter";

export interface InventoryLookup {
    id:number;
    itemCode:string;
    itemName:string;
    pathId:string|null;
    supplierItemCode:string|null;
    manufacturerName:string|null;
    manufacturerDescription:string|null;
    listName:string|null;
}

export class InventoryLookup implements InventoryLookup {

    public pathId:string|null;
    public supplierItemCode:string|null = null;
    public manufacturerName:string|null = null;
    public manufacturerDescription:string|null = null;
    public listName:string|null = null;

    constructor(
        public id:number,
        public itemCode:string,
        public itemName:string,
        pathId:string
    ) {
        this.pathId = pathId;
    }

}

export const InventoryLookupAdapter:ModelAdapter<InventoryLookup> = {

    adapt(item: any): InventoryLookup {
        let ivl = new InventoryLookup(
            item["id"],
            item["item_code"],
            item["item_name"],
            item["path_id"]
        );

        ivl.supplierItemCode = item["suppliers_item_code"];
        ivl.manufacturerName = item["manufacturer_name"];
        ivl.manufacturerDescription = item["manufacturer_description"];
        ivl.listName = (item["list_name"] as string)?.trim() === "" ? null : item["list_name"];

        return ivl;
    }

}