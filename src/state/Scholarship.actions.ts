/**
 * Instead of editing the chrome storage in application files.
 * Ceeate a helper action file that will handle all the logic for adding, editing and removing items from storage.
 */

import { AtilaStorageArea } from "../models/AtilaStorageArea";
import { Scholarship } from "../models/Scholarship";

export type SavedScholarshipCallback = (savedScholarships: Scholarship[] | undefined) => any;
export enum ActionTypes {
    ADD = "ADD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}
class ScholarshipActions {

    static performAction = (type: ActionTypes, scholarshipToRemove: Scholarship, callback?: SavedScholarshipCallback) => {
        chrome.storage.sync.get("savedScholarships", (items: AtilaStorageArea) => {

            let savedScholarships = items.savedScholarships;
            
            if (type === "DELETE") {
                savedScholarships = savedScholarships?.filter(scholarship => scholarship.id !== scholarshipToRemove.id)
            }
    
            console.log({items, savedScholarships});
            chrome.storage.sync.set({ "savedScholarships" : savedScholarships }, function() {
                if(callback) {
                    callback(savedScholarships);
                }
            });
    
        });
    }
}

export default ScholarshipActions;