import { DbConst } from "../../../constants/db-constants";
import { ModelAdapter } from "../core/modelAdapter";
import { RecordWithId } from "../record-with-id";

export interface InventoryUnit extends RecordWithId {
    unit:string;
}

export class InventoryUnit extends RecordWithId implements InventoryUnit {

    constructor(id:number|null, unit:string) {
        super(id);
        this.unit = unit;
    }

    static asNew(unit:string) {
        return new InventoryUnit(DbConst.DefaultId, unit);
    }
}

export const InventoryUnitAdapter:ModelAdapter<InventoryUnit> = {

    adapt(item:any): InventoryUnit {
        return new InventoryUnit(item["id"], item["unit"]);
    }

}