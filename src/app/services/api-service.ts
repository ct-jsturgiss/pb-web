import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiQueryRequest, ApiQueryResult } from "./api-interfaces";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { catchError, first, Observable, of, retry, throwError } from "rxjs";
import { ApiConst } from "../../constants/api-constants";
import { asStringEqual } from "./core/helpers";
import { GlobalStateStore } from "./core/global-state-store";

export interface IPbApi {
    postQuery:(query:ApiQueryRequest) => Observable<ApiQueryResult>;
}

@Injectable({ providedIn: "root"})
export class PbApi implements IPbApi {

    // Services
    protected m_http:HttpClient;

    public globalStateStore:GlobalStateStore;

    constructor(
        globalStateStore:GlobalStateStore,
        http:HttpClient
    ) {
        this.globalStateStore = globalStateStore;
        this.m_http = http;
    }

    unknownRequestError():ApiQueryResult {
        return {
            isError: true,
            isSuccess: false,
            isFatal: true,
            stateCode: ApiConst.errorCodes.unknownError,
        } as ApiQueryResult;
    }

    failedUnreachable():ApiQueryResult {
        return {
            isError: true,
            isSuccess: false,
            isFatal: true,
            stateCode: ApiConst.errorCodes.serverUnreachable,
        } as ApiQueryResult;
    }

    postQuery(query:ApiQueryRequest):Observable<ApiQueryResult> {
        try {
            const fullUri:string = environment.apiEndpoint + query.uri;
            return this.m_http.post<ApiQueryResult>(fullUri, query.toJsonBody(), {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: ApiConst.defaults.requestTimeout
            }).pipe(
                retry(1),
                // Try to capture network failures, otherwise pass on.
                catchError((errorResponse:HttpErrorResponse, obs) => {
                    if(errorResponse.status === ApiConst.ngResponseCodes.unreachable) {
                        const err = errorResponse.error;
                        if(err && (err.total || (asStringEqual(err.message, ApiConst.errorMsgs.fetchFailure)))) {
                            // This should be a network error per ng docs.
                            return throwError(() => this.failedUnreachable());
                        }
                    }

                    return throwError(() => this.unknownRequestError());
                }),
                first(),
            );
        } catch(err) {
            throw err;
        }
    }


}