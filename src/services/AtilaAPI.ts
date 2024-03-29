import { Scholarship } from "../models/Scholarship";
import { Collection } from "../models/Collection";
import Environment from "./Environment";

class AtilaAPI {
    static ATILA_API_CREDITS_PUBLIC_KEY_HEADER_NAME = 'X-ATILA-API-CREDITS-PUBLIC-KEY';
    static ATILA_API_CREDITS_PUBLIC_KEY_LOCAL_STORAGE_KEY_NAME = 'atlasAPIKeyCredit';

    static DEFAULT_HEADERS = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Referer':  `${window.location.origin}${window.location.pathname.replace(/\/$/, "")}`,
        'Origin': window.location.origin
    };

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
            headers: AtilaAPI.DEFAULT_HEADERS,
            body: JSON.stringify({scholarship: postData})
        })
            .then(response => {
                try {
                    return response.json()
                } catch (e) {
                    return response
                }
            });

        return apiResponsePromise
    };

    static createCollection = (collection: Collection) => {
        const collections = collection;
        const apiResponsePromise = fetch(`${Environment.atilaApiUrl}/atlas/collection/`, {
            method: 'POST',
            headers: AtilaAPI.DEFAULT_HEADERS,
            body: JSON.stringify(collections)
        }).then(response => {
            try {
                return response.json()
            } catch (e) {
                return response
            }
        });

        return apiResponsePromise;
    };

    static getNewAPIKeyCredit = () => {
        const apiResponsePromise = fetch(`${Environment.atilaApiUrl}/payment/api-key-credits/get-new-api-key-credit/`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Referrer': document.location.origin,
                [AtilaAPI.ATILA_API_CREDITS_PUBLIC_KEY_HEADER_NAME]: localStorage.getItem(AtilaAPI.ATILA_API_CREDITS_PUBLIC_KEY_LOCAL_STORAGE_KEY_NAME) ?? ''
            },
        }).then(response => {
            try {
                return response.json()
            } catch (e) {
                return response
            }
        });

        return apiResponsePromise;
    }

    static search = (query: string) => {
        const apiResponsePromise = fetch(`${Environment.atilaApiUrl}/search/?q=${query}`, {
            method: 'GET',
            headers: AtilaAPI.DEFAULT_HEADERS,
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