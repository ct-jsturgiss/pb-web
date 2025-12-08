import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiQueryRequest, ApiQueryResult } from "./api-interfaces";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { catchError, Observable, of, retry } from "rxjs";
import { ApiConst } from "../../constants/api-constants";
import { asStringEqual } from "./core/helpers";

export interface IPbApi {
    postQuery:(query:ApiQueryRequest) => Observable<ApiQueryResult>;
}

@Injectable({ providedIn: "root"})
export class PbApi implements IPbApi {

    constructor(protected http:HttpClient) {}

    failedUnreachable():Observable<ApiQueryResult> {
        return of({
            isError: true,
            isSuccess: false,
            isFatal: true,
            stateCode: ApiConst.errorCodes.serverUnreachable,
        } as ApiQueryResult);
    }

    postQuery(query:ApiQueryRequest):Observable<ApiQueryResult> {
        try {
            const fullUri:string = environment.apiEndpoint + query.uri;
            return this.http.post<ApiQueryResult>(fullUri, query.toJsonBody(), {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: ApiConst.defaults.requestTimeout
            }).pipe(
                // Try to capture network failures, otherwise pass on.
                catchError((errorResponse:HttpErrorResponse, obs) => {
                    if(errorResponse.status === ApiConst.ngResponseCodes.unreachable) {
                        const err = errorResponse.error;
                        if(err && (err.total || (asStringEqual(err.message, ApiConst.errorMsgs.fetchFailure)))) {
                            // This should be a network error per ng docs.
                            return this.failedUnreachable();
                        }
                    }
                    return obs;
                }),
            retry(1));
        } catch(err) {
            throw err;
        }
    }


}