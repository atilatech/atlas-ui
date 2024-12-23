export const EnvironmentDev = {
    name: 'dev',
    frontendUrl: 'http://localhost:3000',
    apiUrl: 'http://127.0.0.1:8080/api',
    atilaApiUrl: 'http://127.0.0.1:8000/api',
    // Note if you have atilaApiUrl and atilaCoreServiceApiUrl running at same time
    // you will have to set atilaCoreServiceApiUrl to run at 8001
    atilaCoreServiceApiUrl: 'http://127.0.0.1:8000/api',
    stripePaymentsLink: 'https://buy.stripe.com/test_9AQ9CobDo0U738AdQX',
    stripeManageBillingLink: 'https://billing.stripe.com/p/login/test_4gwaHfguVf2sgdWcMM',
};


export const EnvironmentStaging = {
    name: 'staging',
    frontendUrl: 'https://staging.atila.ca',
    apiUrl: 'https://5dkl8h3luf.execute-api.us-east-1.amazonaws.com/staging/api',
    atilaApiUrl: 'https://atila-7-staging.herokuapp.com/api',
    atilaCoreServiceApiUrl: 'https://atila-core-service-299c222291ba.herokuapp.com/api',
    stripePaymentsLink: 'https://buy.stripe.com/test_9AQ9CobDo0U738AdQX',
    stripeManageBillingLink: 'https://billing.stripe.com/p/login/test_4gwaHfguVf2sgdWcMM',
};

export const EnvironmentProd = {
    name: 'prod',
    frontendUrl: 'https://atila.ca',
    apiUrl: 'https://5dkl8h3luf.execute-api.us-east-1.amazonaws.com/prod/api',
    atilaApiUrl: 'https://atila-7.herokuapp.com/api',
    atilaCoreServiceApiUrl: 'https://atila-core-service-299c222291ba.herokuapp.com/api',
    stripePaymentsLink: 'https://buy.stripe.com/fZeg2q3Vzd574ZGfZc',
    stripeManageBillingLink: 'https://billing.stripe.com/p/login/cN2dRb9UE5PefSg4gg',
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}
if(process.env.REACT_APP_ATILA_STAGE === "staging"){
    Environment =  EnvironmentStaging;
}

if (window.location.host === 'staging.atlas.atila.ca') {
    Environment = EnvironmentStaging;
} else if (window.location.host === 'atlas.atila.ca') {
    Environment =  EnvironmentProd;
}

export default Environment;
