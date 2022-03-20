import { Scholarship } from "../models/Scholarship";
import Environment from "./Environment";
import {BlogContent} from "../models/BlogContent";

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

    static saveBlogContent = (blogContent: BlogContent) => {
        const apiResponsePromise = fetch(`${Environment.apiUrl}/blog-posts/`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Referrer': document.location.origin
            },
            body: JSON.stringify({blogContent})
        }).then(response => {
            try {
                return response.json()
            } catch (e) {
                return response
            }
        })

        return apiResponsePromise;
    }
}

export default AtilaAPI;