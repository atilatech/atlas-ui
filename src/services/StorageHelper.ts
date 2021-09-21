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

class StorageHelper {

    static performAction = (actionType: ActionTypes, objectType: "savedScholarships",
     targetObject: Scholarship | null, callback?: SavedScholarshipCallback) => {
         
        chrome.storage.sync.get(objectType, (items: AtilaStorageArea) => {

            let storageData = items[objectType];

            if (actionType === ActionTypes.GET) {
                if(callback) {
                    callback(storageData!)
                }
                return
            } else if (targetObject === null) {
                throw new Error(`targetScholarship argument can only be null for the 'GET' action type. Action type '${actionType}' was received`);
            }

            if (objectType === "savedScholarships") {
                storageData = StorageHelper.performSavedScholarshipsAction(actionType, targetObject!, storageData)
            }
            chrome.storage.sync.set({ [objectType] : storageData }, function() {
                if(callback) {
                    callback(storageData!);
                }
            });
    
        });
    }

    static performSavedScholarshipsAction = (type: ActionTypes, targetObject: Scholarship, savedScholarships: SavedScholarships | undefined) => {
        
        if (type === ActionTypes.ADD || type == ActionTypes.UPDATE) {
            if(type === ActionTypes.ADD) {
                targetObject.date_created = new Date().toISOString();
            }
            targetObject.date_modified = new Date().toISOString();

            if (!savedScholarships) {
                savedScholarships = {
                    [targetObject.id]: targetObject,
                };
            } else {
                savedScholarships[targetObject.id] = targetObject
            }

        }  else if (type === ActionTypes.DELETE) {
            delete savedScholarships![targetObject.id]
        }

        return savedScholarships;
    }
}

export default StorageHelper;