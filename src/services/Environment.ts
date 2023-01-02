export const EnvironmentDev = {
    frontendUrl: 'http://localhost:3000',
    apiUrl: 'http://127.0.0.1:8080/api',
    atilaApiUrl: 'http://127.0.0.1:8000/api',
    atilaCoreServiceApiUrl: 'http://127.0.0.1:8001/api'
};


export const EnvironmentStaging = {
    frontendUrl: 'https://staging.atila.ca',
    apiUrl: 'https://5dkl8h3luf.execute-api.us-east-1.amazonaws.com/staging/api',
    atilaApiUrl: 'https://atila-7-staging.herokuapp.com/api',
    atilaCoreServiceApiUrl: 'https://atila-core-service.herokuapp.com/api'
};

export const EnvironmentProd = {
    frontendUrl: 'https://atila.ca',
    apiUrl: 'https://5dkl8h3luf.execute-api.us-east-1.amazonaws.com/prod/api',
    atilaApiUrl: 'https://atila-7.herokuapp.com/api',
    atilaCoreServiceApiUrl: 'https://atila-core-service.herokuapp.com/api/atlas'
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}
if(process.env.REACT_APP_ATILA_STAGE === "staging"){
    Environment =  EnvironmentStaging;
}

export default Environment;
