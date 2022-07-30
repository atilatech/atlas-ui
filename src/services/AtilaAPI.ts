import { Scholarship } from "../models/Scholarship";
import { Collection } from "../models/Collection";
import Environment from "./Environment";

class AtilaAPI {

    static saveScholarship = (scholarship: Scholarship) => {
            const postData: Scholarship | any = {
                ...scholarship,
            }
    
            postData.local_id = scholarship.id;
            delete postData.id;
            delete postData.notes;
            delete postData.date_created;
            delete postData.date_modified;
            // TODO add a test to ensure that that post scholarship is called with the correct format that the Atila API expects
            const apiResponsePromise = fetch(`${Environment.apiUrl}/scholarships/`, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Referrer': document.location.origin
                },
                body: JSON.stringify({scholarship: postData})
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

    static createCollection = (collection: Collection) => {
        const collections = collection;
        const apiResponsePromise = fetch(`${Environment.djangoAPIUrl}/atlas/collection/`, {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Referrer': document.location.origin
            },
            body: JSON.stringify(collections)
        }).then(response => {
            try {
                return response.json()
            } catch (e) {
                return response
            }
        });

        return apiResponsePromise;
    }
}

export default AtilaAPI;