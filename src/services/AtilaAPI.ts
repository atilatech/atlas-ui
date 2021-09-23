import { Scholarship } from "../models/Scholarship";
import Environment from "./Environment";

class AtilaAPI {
    static scholarshipsApiUrl = `${Environment.apiUrl}/scholarship/`;

    static saveScholarship = (scholarship: Scholarship) => {

        const apiResponsePromise = fetch(AtilaAPI.scholarshipsApiUrl, {
                                            method: 'POST',
                                            headers: {
                                            'Accept': 'application/json',
                                            'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({scholarship})
                                        })
                                    .then(response => {
                                        try {
                                            return response.json()
                                        } catch(e) {
                                            return response
                                        }
                                    });

        return apiResponsePromise
    };
}

export default AtilaAPI;