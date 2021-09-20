/**
 * Instead of editing the chrome storage in application files.
 * Ceeate a helper action file that will handle all the logic for adding, editing and removing items from storage.
 */

import { AtilaStorageArea, SavedScholarships } from "../models/AtilaStorageArea";
import { Scholarship } from "../models/Scholarship";

export type SavedScholarshipCallback = (savedScholarships: SavedScholarships) => any;
export enum ActionTypes {
    ADD = "ADD",
    GET = "GET",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
}
class ScholarshipActions {

    static performAction = (type: ActionTypes, targetScholarship: Scholarship | null, callback?: SavedScholarshipCallback) => {
        chrome.storage.sync.get("savedScholarships", (items: AtilaStorageArea) => {

            let { savedScholarships } = items;

            if (type === ActionTypes.GET) {
                if(callback) {
                    callback(savedScholarships!)
                }
                return
            } else if (targetScholarship === null) {
                throw new Error(`targetScholarship argument can only be null for the 'GET' action type. Action type '${type}'' was received`);
            }
            
            if (type === ActionTypes.ADD || type == ActionTypes.UPDATE) {
                if(type === ActionTypes.ADD) {
                    targetScholarship.date_created = new Date().toISOString();
                }
                targetScholarship.date_modified = new Date().toISOString();

                if (!savedScholarships) {
                    savedScholarships = {
                        [targetScholarship.id]: targetScholarship,
                    };
                } else {
                    savedScholarships[targetScholarship.id] = targetScholarship
                }

            }  else if (type === ActionTypes.DELETE) {
                delete savedScholarships![targetScholarship.id]
            }
            chrome.storage.sync.set({ "savedScholarships" : savedScholarships }, function() {
                if(callback) {
                    callback(savedScholarships!);
                }
            });
    
        });
    }
}

export default ScholarshipActions;