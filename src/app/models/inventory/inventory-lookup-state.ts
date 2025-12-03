import { LookupMode } from "../core/lookup-mode";
import { InventoryLookup } from "./inventory-lookup";
import { IvLookupSelection } from "./inventory-lookup-selection";

export interface IvLookupState {
    lookupStore:InventoryLookup[];
    lookupView:InventoryLookup[];
    selected:InventoryLookup|null;
    mode:LookupMode;
    leafSelection:IvLookupSelection|null;
    searchPattern:string;
}

export class IvLookupState implements IvLookupState {

    constructor() {
        this.lookupStore = [];
        this.lookupView = [];
        this.selected = null;
        this.mode = LookupMode.SearchPattern;
        this.leafSelection = null;
        this.searchPattern = "";
    }

    static default():IvLookupState {
        return new IvLookupState();
    }
}