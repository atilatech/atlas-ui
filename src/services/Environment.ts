export const EnvironmentDev = {
    apiUrl: 'http://127.0.0.1:8080/api',
    atilaApiUrl: 'http://127.0.0.1:8000/api'
};

export const EnvironmentProd = {
    apiUrl: 'https://5dkl8h3luf.execute-api.us-east-1.amazonaws.com/prod/api',
    atilaApiUrl: 'https://atila-7.herokuapp.com/api'
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}

export default Environment;
