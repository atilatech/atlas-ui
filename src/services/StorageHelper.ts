/**
 * Instead of editing the chrome storage in application files.
 * Ceeate a helper action file that will handle all the logic for adding, editing and removing items from storage.
 */

 import { AtilaStorageArea, SavedScholarships } from "../models/AtilaStorageArea";
 import { GeneralNotes } from "../models/GeneralNotes";
 import { Scholarship, SCHOLARSHIP_CREATION_SOURCE_CHROME_EXTENSION } from "../models/Scholarship";
 import AtilaAPI from "./AtilaAPI";
import { Utils } from "./Utils";
 
 export type SavedScholarshipCallback = (savedScholarships: SavedScholarships | GeneralNotes) => any;
 export enum ActionTypes {
     ADD = "ADD",
     GET = "GET",
     UPDATE = "UPDATE",
     DELETE = "DELETE",
 }
 
 class StorageHelper {
 
     static performAction = (actionType: ActionTypes, objectType: "savedScholarships" | "generalNotes",
      targetObject: Scholarship | GeneralNotes | null, callback?: SavedScholarshipCallback) => {
          
         chrome.storage.sync.get([objectType, "guestUserId"], (items: AtilaStorageArea) => {
 
             let storageData = items[objectType];
             let guestUserId = items.guestUserId;

             if (!guestUserId) {
                guestUserId = Utils.getRandomString();
                chrome.storage.sync.set({ guestUserId });
             }

 
             if (actionType === ActionTypes.GET) {
                 if(callback) {
                     callback(storageData!)
                 }
                 return
             } else if (targetObject === null) {
                 throw new Error(`targetScholarship argument can only be null for the 'GET' action type. Action type '${actionType}' was received`);
             }
 
             if (objectType === "savedScholarships") {
                 storageData = StorageHelper.performSavedScholarshipsAction(actionType, targetObject! as Scholarship, storageData as SavedScholarships, guestUserId)
             }
 
             if (objectType === "generalNotes") {
                 storageData = StorageHelper.performGeneralNotesAction(actionType, targetObject! as GeneralNotes, storageData as GeneralNotes)
             }
             chrome.storage.sync.set({ [objectType] : storageData }, function() {
                 if(callback) {
                     callback(storageData!);
                 }
             });
     
         });
     }
 
     // TODO instead of using hacky unions of 'any' everyhwere, find a way to ensure that performSavedScholarshipsAction only gets called with the Scholarship object type
     static performSavedScholarshipsAction = (type: ActionTypes, targetObject: Scholarship, savedScholarships: SavedScholarships, guestUserId: string) => {
         
         if (type === ActionTypes.ADD || type === ActionTypes.UPDATE) {
             if(type === ActionTypes.ADD) {
                 targetObject.date_created = new Date().toISOString();
                 targetObject.creation_source = SCHOLARSHIP_CREATION_SOURCE_CHROME_EXTENSION;
             }
             targetObject.date_modified = new Date().toISOString();
 
             if (!savedScholarships) {
                 savedScholarships = {
                     [targetObject.id]: targetObject,
                 };
             } else {
                 savedScholarships[targetObject.id] = targetObject
             }
 
             if (type === ActionTypes.ADD) {
                 AtilaAPI.saveScholarship(targetObject, guestUserId)
                     .then(res =>console.log({res}))
                     .catch(err =>console.log({err}))
             }
 
         }  else if (type === ActionTypes.DELETE) {
             delete savedScholarships![targetObject.id]
         }
 
         return savedScholarships;
     }
 
     static performGeneralNotesAction = (type: ActionTypes, targetObject: GeneralNotes, existingData: GeneralNotes | null) => {
         
         if ( type === ActionTypes.UPDATE) {
 
             if (!existingData) {
                 existingData = targetObject;
                 existingData.date_created = new Date().toISOString();
             } 
             existingData = {
                 ...existingData,
                 notes: targetObject.notes,
             }
             existingData.date_modified = new Date().toISOString();
 
         } else {
             throw new Error(`This action only supports the 'GET' action type, '${type}' was received instead.'`);
             
         }
 
         return existingData;
     }
 }
 
 export default StorageHelper;