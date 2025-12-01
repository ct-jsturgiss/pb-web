import { Injectable } from "@angular/core";
import { PbApi } from "../api-service";
import { map, Observable } from "rxjs";
import { ApiQueryRequest, ApiQueryResult } from "../api-interfaces";
import { InventoryLookup, InventoryLookupAdapter } from "../../models/inventory/inventory-lookup";
import { HttpClient } from "@angular/common/http";
import { IvLookupPath, IvLookupPathAdapter } from "../../models/inventory/inventory-lookup-path";

@Injectable({ providedIn: "root"})
export class InventoryApiService extends PbApi {

    constructor(
        protected override http:HttpClient
    ) {
        super(http);
    }

    listInventoryLookups(query:ApiQueryRequest): Observable<InventoryLookup[]> {
        return this.postQuery(query)
            .pipe<InventoryLookup[]>(
                map((result:ApiQueryResult) => (result.data?.records.map(r => InventoryLookupAdapter.adapt(r)) ?? []) as InventoryLookup[])
            );
    }

    listInventoryLookupPaths(query:ApiQueryRequest): Observable<IvLookupPath[]> {
        return this.postQuery(query)
            .pipe<IvLookupPath[]>(
                map((result:ApiQueryResult) => (result.data?.records.map(r => IvLookupPathAdapter.adapt(r)) ?? []) as IvLookupPath[])
            );
    }
}