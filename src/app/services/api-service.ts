import { HttpClient } from "@angular/common/http";
import { ApiQueryRequest, ApiQueryResult } from "./api-interfaces";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

export interface IPbApi {
    executeQuery:<TModel>(query:ApiQueryRequest) => Observable<TModel[]>;
}

@Injectable({ providedIn: "root"})
export abstract class PbApi implements IPbApi {

    constructor(protected http:HttpClient) {}

    abstract executeQuery<TModel>(query: ApiQueryRequest): Observable<TModel[]>;

    postQuery(query:ApiQueryRequest) {
        const fullUri:string = environment.apiEndpoint + query.uri;
        return this.http.post<ApiQueryResult>(fullUri, query.toJsonBody(), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

}