import { IvLookupPath } from "./inventory-lookup-path";

export interface IvLookupCache { 
    leaf1:IvLookupPath[];
    leaf2:IvLookupPath[];
    leaf3:IvLookupPath[];
    leaf4:IvLookupPath[];
    leaf5:IvLookupPath[];
    leaf6:IvLookupPath[];
    leaf7:IvLookupPath[];
}

export class IvLookupCache implements IvLookupCache {

    constructor() {
        this.leaf1 = [];
        this.leaf2 = [];
        this.leaf3 = [];
        this.leaf4 = [];
        this.leaf5 = [];
        this.leaf6 = [];
        this.leaf7 = [];
    }

}