import { Injectable } from "@angular/core";
import { PbApi } from "../api-service";
import { map, Observable } from "rxjs";
import { ApiQueryRequest, ApiQueryResult } from "../api-interfaces";
import { query } from "express";
import { InventoryLookupAdapter } from "../../models/inventory/inventory-lookup";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root"})
export class InventoryApiService extends PbApi {

    constructor(
        protected override http:HttpClient,
        private adapter:InventoryLookupAdapter
    ) {
        super(http);
    }

    override executeQuery<InventoryLookup>(query:ApiQueryRequest): Observable<InventoryLookup[]> {

        return this.postQuery(query)
            .pipe<InventoryLookup[]>(
                map((result:ApiQueryResult) => (result.data?.records.map(r => this.adapter.adapt(r)) ?? []) as InventoryLookup[])
            );

    }

}