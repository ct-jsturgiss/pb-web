import { DbConst } from "../../../constants/db-constants";
import { RecordChangeKind } from "../core/common-types";
import { ModelAdapter } from "../core/modelAdapter";
import { RecordWithId } from "../record-with-id";

export interface InventoryUnit extends RecordWithId {
    unit:string;
    unitName:string;
    pluralName:string|null;
}

export interface InventoryUnitChange {
    record:InventoryUnit;
    changeKind:RecordChangeKind;
}

export class InventoryUnit extends RecordWithId implements InventoryUnit {

    constructor(id:number|null, unit:string, name:string) {
        super(id);
        this.unit = unit;
        this.unitName = name;
    }

    static asNew(unit:string, name:string) {
        return new InventoryUnit(DbConst.DefaultId, unit, name);
    }
}

export const InventoryUnitAdapter:ModelAdapter<InventoryUnit> = {

    adapt(item:any): InventoryUnit {
        const unit = new InventoryUnit(item["id"], item["unit"], item["name"]);
        unit.pluralName = item["plural_name"] ?? null;

        return unit;
    }

}