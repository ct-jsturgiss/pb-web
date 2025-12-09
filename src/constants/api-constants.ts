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
    errorCodes: {
        unknownError: {
            msg: "Unkown error has occurred",
            code: 0x000001
        },
        serverUnreachable: {
            msg: "Server is unreachable.",
            code: 0x000002
        } as ApiRequestError,
    },
    ngResponseCodes: {
        unreachable: 0,
    },
}