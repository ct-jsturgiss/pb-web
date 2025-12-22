import { ApiRequestResult } from "../app/services/api-interfaces";

export interface ApiRequestError {
    msg:string;
    code:number;
}

export const ApiConst = {
    defaults: {
        requestTimeout: 1000 * 15, // ms -> sec
    },
    errorMsgs: {
        fetchFailure: "FAILED TO FETCH",
    },
    helpers: {
        getToastMessage: (result:ApiRequestResult) => {
            const first = result.errors?.at(0);
            if(first) {
                switch(first.errorCode) {
                    case ApiConst.responseErrorCodes.duplicateKey:
                        return `Duplicate record detected`; //  for entry: ${JSON.stringify(first.recordKeys)}
                    default:
                        return first.errorMessage;
                }
            }

            return "Unknown Error";
        }
    },
    localErrorCodes: {
        unknownError: {
            msg: "Unkown error has occurred",
            code: 0x000001
        } as ApiRequestError,
        serverUnreachable: {
            msg: "Server is unreachable.",
            code: 0x000002
        } as ApiRequestError,
    },
    ngResponseCodes: {
        unreachable: 0,
    },
    responseErrorCodes: {
        duplicateKey: 0xC8 // 200
    },
}

