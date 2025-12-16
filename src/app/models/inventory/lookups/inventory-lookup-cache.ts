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

    getLeafByLevel(level:number):IvLookupPath[] {
        switch(level) {
            case 1:
                return this.leaf1;
            case 2:
                return this.leaf2;
            case 3:
                return this.leaf3;
            case 4:
                return this.leaf4;
            case 5:
                return this.leaf5;
            case 6:
                return this.leaf6;
            case 7:
                return this.leaf7;
            default:
                throw new Error(`Lookup path level ${level} is not defined.`);
        }
    }

    setLeafByLevel(paths:IvLookupPath[], level:number) {
        switch(level) {
            case 1:
                this.leaf1 = paths;
                break;
            case 2:
                this.leaf2 = paths;
                break;
            case 3:
                this.leaf3 = paths;
                break;
            case 4:
                this.leaf4 = paths;
                break;
            case 5:
                this.leaf5 = paths;
                break;
            case 6:
                this.leaf6 = paths;
                break;
            case 7:
                this.leaf7 = paths;
                break;
            default:
                throw new Error(`Lookup path level ${level} is not defined.`);
        }
    }

}