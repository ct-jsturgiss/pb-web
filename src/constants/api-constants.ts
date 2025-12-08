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
        serverUnreachable: {
            msg: "Server is unreachable.",
            code: 0x000001
        } as ApiRequestError,
    },
    ngResponseCodes: {
        unreachable: 0,
    },
}