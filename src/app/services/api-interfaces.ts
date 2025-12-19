import { ApiRequestError } from "../../constants/api-constants";

export type ApiResultHandler = (response:ApiRequestResult) => void;

export interface ApiErrorState {
    hasErrors:boolean;
    userNotified:boolean;
}

export class ApiErrorState implements ApiErrorState {

    constructor(){
        this.hasErrors = false;
        this.userNotified = false;
    }

    static default():ApiErrorState {
        return new ApiErrorState();
    }

}

export interface QueryData<T> {
    response:ApiRequestResult;
    records:T[];
}

export interface ApiQueryRecords {
    offset?:number;
    pageSize?:number;
    count:number;
    records:any[];
}

export interface ApiResultError {
    errorCode:number;
    errorMessage:string;
    recordKeys:any;
}

export interface ApiRequestResult {
    isSuccess:boolean;
    isError:boolean;
    isFatal?:boolean;
    message?:string[];
    errors?:ApiResultError[]; // TODO: Change to errors object interface.
    data?:ApiQueryRecords;
    stateCode?:ApiRequestError
}

export class ApiRequestResult implements ApiRequestResult {

    constructor(json:any) {
        if(!json || typeof json !== "object") {
            throw new Error("Query result cannot be initialized without a proper JSON response object.");
        }

        this.isSuccess = json["is_success"] ?? false; 
        this.isError = json["is_error"] ?? false;
        this.isFatal = json["is_fatal"] ?? false;
        this.message = json["message"] ?? [];
        this.errors = (json["errors"] ?? []).map((e:any) => { 
            return {
                errorCode: e["error_code"], 
                errorMessage: e["error_message"],
                recordKeys: e["record_keys"] 
            } as ApiResultError
        });
        this.data = json["data"] ?? {};
    }

}

export interface ApiQueryBody {
    "page_size"?:number;
    "offset"?:number;
}

export interface ApiQueryRequest {
    uri:string;
    pageSize?:number;
    offset?:number;
    requestData?:object;
    toJsonBody: () => string;
}

export class ApiQueryRequest implements ApiQueryRequest {

    constructor() {

        this.toJsonBody = function():string {
            const body:any = {
                ...this.requestData
            };
            if(this.offset) {
                body["offset"] = this.offset;
            }
            if(this.pageSize) {
                body["page_size"] = this.pageSize;
            }

            return JSON.stringify(body);
        }
    }

    setUri(uri:string) {
        this.uri = uri;

        return this;
    }

    setPageSize(pageSize?:number) {
        this.pageSize = pageSize;
        
        return this;
    }

    setOffset(offset?:number) {
        this.offset = offset;

        return this;
    }

    setRequestData(data:object) {
        this.requestData = data;

        return this;
    }
}

/**
 * String enum for type of API change request being submitted, corresponding to an HTTP method.
 */
export type ApiChangeMethod = "PUT"|"PATCH"|"DELETE";

/**
 * Provides a generic interface for an API request to change record data, using PUT, PATCH, DELETE.
 */
export interface ApiRecordChangeRequest<T> {
    uri:string;
    records:T[];
    toJsonBody: () => string;
}

export class ApiRecordChangeRequest<T> implements ApiRecordChangeRequest<T> {
    constructor() {
        this.uri = "";
        this.records = [];
        this.toJsonBody = function():string {
            const body:any = {
                "records": this.records // TODO: Add constant?
            };
            return JSON.stringify(body);
        }
    }

    setUri(uri:string) {
        this.uri = uri;

        return this;
    }
}