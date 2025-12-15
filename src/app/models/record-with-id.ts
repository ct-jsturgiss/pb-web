import { DbConst } from "../../constants/db-constants";

export interface RecordWithId {
    id:number;
}

export class RecordWithId implements RecordWithId {

    public id:number;

    constructor(id:number|null) {
        this.id = id ?? DbConst.DefaultId;
    }
}