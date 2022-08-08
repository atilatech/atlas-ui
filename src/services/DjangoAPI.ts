import Environment from "./Environment";

class DjangoAPI {

    static apiUrl = Environment.apiUrlDjango

    static DEFAULT_HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer':  `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`,
        'Origin': window.location.origin
    };


    static getHeadersWithAPIKey = () => ({
        ...DjangoAPI.DEFAULT_HEADERS,
        "Authentication": `JWT ${localStorage.getItem("jwt_token")}`
    })

    static login = (username: string, password: string) => {
        const postData = {
            username, password
        }
        const apiResponsePromise = fetch(`${DjangoAPI.apiUrl}/login/`, {
            method: 'POST',
            headers: DjangoAPI.DEFAULT_HEADERS,
            body: JSON.stringify(postData)
        })
            .then(response => {
                try {
                    return response.json()
                } catch(e) {
                    return response
                }
            });

        return apiResponsePromise
    }
}

export default DjangoAPI;
