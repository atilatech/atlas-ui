export const EnvironmentDev = {
    apiUrl: 'http://127.0.0.1:8000/api',
};

export const EnvironmentProd = {
    apiUrl: 'https://atila-7.herokuapp.com/api',
};

// set to EnvironmentDev as the default so we can use type hinting and the autocomplete feature
let Environment = EnvironmentDev;

if(process.env.REACT_APP_ATILA_STAGE === "prod"){
    Environment =  EnvironmentProd;
}

export default Environment;
