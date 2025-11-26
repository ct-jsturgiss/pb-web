import { HttpClient } from "@angular/common/http";
import { ApiQueryRequest, ApiQueryResult } from "../api-interfaces";
import { Injectable } from "@angular/core";

const endpointUri = "https://localhost:7255/api/";

@Injectable({ providedIn: "root"})
export default class PbApi {

    constructor(private http:HttpClient) {

    }

    executeQuery(query:ApiQueryRequest) {
        try {

            const fullUri:string = endpointUri + query.uri;
            const resultSub = this.http.post<ApiQueryResult>(fullUri, query.toJsonBody(), {
                headers: {
                    "Content-Type": "application/json"
                }
            }).subscribe(query.handleResponse);

        } catch(error:any) {
            console.error("Failed to fetch query result through api: %s", error);
        }
    }

}