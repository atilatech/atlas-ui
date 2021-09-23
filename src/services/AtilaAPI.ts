import { AtilaStorageArea } from "../models/AtilaStorageArea";
import { Scholarship } from "../models/Scholarship";
import Environment from "./Environment";

class AtilaAPI {
    static scholarshipsApiUrl = `${Environment.apiUrl}/scholarships/`;

    static saveScholarship = (scholarship: Scholarship, guestUserId: string) => {
            const postData: Scholarship | any = {
                ...scholarship,
            }
    
            postData.local_id = scholarship.id;
            postData.owner_guest_user_id = guestUserId;
            delete postData.id;
            delete postData.notes;
            delete postData.date_created;
            delete postData.date_modified;
    
            // TODO add a test to ensure that that post scholarship is called with the correct format that the Atila API expects
            const apiResponsePromise = fetch(AtilaAPI.scholarshipsApiUrl, {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
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
}

export default AtilaAPI;