import { InventoryLookup } from "./inventory-lookup";

export interface InventoryRecord extends InventoryLookup {
    id:number;
    itemCode:string;
    itemName:string;
    pathId:string|null;
    ctListPrice:number|null;
    ctListDesc:string|null;
    //
    supplierItemCode:string|null;
    manufacturerName:string|null;
    manufacturerDescription:string|null;
    listName:string|null;
}

export class IvRecord implements InventoryRecord {

    public pathId:string|null = null;
    public ctListPrice:number|null = null;
    public ctListDesc:string|null = null;
    //
    public supplierItemCode:string|null = null;
    public manufacturerName:string|null = null;
    public manufacturerDescription:string|null = null;
    public listName:string|null = null;

    constructor(public id:number, 
        public itemCode:string,
        public itemName:string) {
    }

    public static FromLookup(lookup:InventoryLookup):IvRecord {
        const rec = new IvRecord(lookup.id, lookup.itemCode, lookup.itemName);
        Object.assign(rec, lookup);
        
        return rec;
    }
}