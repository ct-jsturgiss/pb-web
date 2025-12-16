import { Injectable } from "@angular/core";
import { PbApi } from "../api-service";
import { map, Observable } from "rxjs";
import { ApiQueryRequest, ApiQueryResult, QueryData } from "../api-interfaces";
import { InventoryLookup, InventoryLookupAdapter } from "../../models/inventory/lookups/inventory-lookup";
import { HttpClient } from "@angular/common/http";
import { IvLookupPath, IvLookupPathAdapter } from "../../models/inventory/lookups/inventory-lookup-path";
import { response } from "express";
import { GlobalStateStore } from "../core/global-state-store";
import { InventoryUnit, InventoryUnitAdapter } from "../../models/inventory/inventory-unit";

@Injectable({ providedIn: "root"})
export class InventoryApiService extends PbApi {

    constructor(globalStateStore:GlobalStateStore, http:HttpClient) {
        super(globalStateStore, http);
    }

    listInventoryUnits(query:ApiQueryRequest): Observable<QueryData<InventoryUnit>> {
        return this.postQuery(query)
            .pipe<QueryData<InventoryUnit>>(
                map((result:ApiQueryResult) => {
                    if(result.isFatal) {
                        return {
                            response: result,
                            records: []
                        };
                    } else {
                        return {
                            response: result,
                            records: (result.data?.records.map(r => InventoryUnitAdapter.adapt(r)) ?? [])
                        }
                    }
                })
            );
    }

    listInventoryLookups(query:ApiQueryRequest): Observable<QueryData<InventoryLookup>> {
        return this.postQuery(query)
            .pipe<QueryData<InventoryLookup>>(
                map((result:ApiQueryResult) => {
                    if(result.isFatal) {
                        return {
                            response: result,
                            records: []
                        };
                    } else {
                        return {
                            response: result,
                            records: (result.data?.records.map(r => InventoryLookupAdapter.adapt(r)) ?? [])
                        };
                    }
                })
            );
    }

    listInventoryLookupPaths(query:ApiQueryRequest): Observable<QueryData<IvLookupPath>> {
        return this.postQuery(query)
            .pipe<QueryData<IvLookupPath>>(
                map((result:ApiQueryResult) => {
                    if(result.isFatal) {    
                        return {
                            response: result,
                            records: []
                        };
                    } else {
                        return {
                            response: result,
                            records: (result.data?.records.map(r => IvLookupPathAdapter.adapt(r)) ?? []) as IvLookupPath[]
                        };
                    }
                })
            );
    }
}