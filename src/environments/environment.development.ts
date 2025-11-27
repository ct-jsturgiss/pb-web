// Ignore localhost SSL errors
// Try/Catch is only to stop browser errors.
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";

export const environment = {
    production: false,
    apiEndpoint: "https://localhost:7255/api/",
};
