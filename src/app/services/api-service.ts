import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { ApiChangeMethod, ApiRecordChangeRequest, ApiQueryRequest, ApiRequestResult } from "./api-interfaces";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { catchError, first, Observable, of, pipe, retry, throwError } from "rxjs";
import { ApiConst } from "../../constants/api-constants";
import { asStringEqual } from "./core/helpers";
import { GlobalStateStore } from "./core/global-state-store";

export interface IPbApi {
    postQuery:(query:ApiQueryRequest) => Observable<ApiRequestResult>;
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

    unknownRequestError():ApiRequestResult {
        return {
            isError: true,
            isSuccess: false,
            isFatal: true,
            stateCode: ApiConst.errorCodes.unknownError,
        } as ApiRequestResult;
    }

    failedUnreachable():ApiRequestResult {
        return {
            isError: true,
            isSuccess: false,
            isFatal: true,
            stateCode: ApiConst.errorCodes.serverUnreachable,
        } as ApiRequestResult;
    }

    postQuery(query:ApiQueryRequest):Observable<ApiRequestResult> {
        try {
            const fullUri:string = environment.apiEndpoint + query.uri;
            return this.m_http.post<ApiRequestResult>(fullUri, query.toJsonBody(), {
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
                })
            );
        } catch(err) {
            throw err;
        }
    }

    pushRecordChanges<T>(method:ApiChangeMethod, pushRequest:ApiRecordChangeRequest<T>):Observable<ApiRequestResult> {
        try {
            const fullUri:string = environment.apiEndpoint + pushRequest.uri;
            const httpOptions = {
                headers: {
                    "Content-Type": "application/json"
                },
                timeout: ApiConst.defaults.requestTimeout
            };
            const body = pushRequest.toJsonBody();
            let observable:Observable<ApiRequestResult>;
            switch(method) {
                case "PUT":
                    observable = this.m_http.put<ApiRequestResult>(fullUri, body, httpOptions);
                    break;
                case "PATCH":
                    observable = this.m_http.patch<ApiRequestResult>(fullUri, body, httpOptions);
                    break;
                case "DELETE":
                    observable = this.m_http.post<ApiRequestResult>(fullUri, body, httpOptions);
                    break;
            }
            return observable.pipe(
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
                })
            );
        } catch(err) {
            throw err;
        }
    }
}