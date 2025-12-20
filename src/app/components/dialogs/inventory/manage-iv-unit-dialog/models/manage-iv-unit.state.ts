import { InventoryUnit } from "../../../../../models/inventory/inventory-unit";
import { ManageMode } from "../../../../core/models/manage-mode.enum";

export interface ManageIvUnitState {
    mode:ManageMode
    unit:InventoryUnit;
}

export class ManageIvUnitState implements ManageIvUnitState {

    constructor() {
        this.mode = ManageMode.None;
        this.unit = InventoryUnit.asNew("","");;
    }

}