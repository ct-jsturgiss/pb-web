import { ApiErrorState } from "../../constants/api-constants";

export type ApiResultHandler = (response:ApiQueryResult) => void;

export interface QueryData<T> {
    response:ApiQueryResult;
    records:T[];
}

export interface ApiQueryRecords {
    offset?:number;
    pageSize?:number;
    count:number;
    records:any[];
}

export interface ApiQueryResult {
    isSuccess:boolean;
    isError:boolean;
    isFatal?:boolean;
    message?:string[];
    errors?:string[];
    data?:ApiQueryRecords;
    stateCode?:ApiErrorState
}

export class ApiQueryResult implements ApiQueryResult {

    constructor(json:any) {
        if(!json || typeof json !== "object") {
            throw new Error("Query result cannot be initialized without a proper JSON response object.");
        }

        this.isSuccess = json["is_success"] ?? false; 
        this.isError = json["is_error"] ?? false;
        this.isFatal = json["is_fatal"] ?? false;
        this.message = json["message"] ?? [];
        this.errors = json["errors"] ?? [];
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