// Ignore localhost SSL errors
// Try/Catch is only to stop browser errors.
try {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
} catch(err) {}

export const environment = {
    production: false,
    apiEndpoint: "https://localhost:7255/api/",
};
