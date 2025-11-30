import { HttpClient } from "@angular/common/http";
import { ApiQueryRequest, ApiQueryResult } from "./api-interfaces";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { Observable } from "rxjs";

export interface IPbApi {
    postQuery:(query:ApiQueryRequest) => Observable<ApiQueryResult>;
}

@Injectable({ providedIn: "root"})
export class PbApi implements IPbApi {

    constructor(protected http:HttpClient) {}

    postQuery(query:ApiQueryRequest) {
        const fullUri:string = environment.apiEndpoint + query.uri;
        return this.http.post<ApiQueryResult>(fullUri, query.toJsonBody(), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

}