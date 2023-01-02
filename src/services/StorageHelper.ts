/**
 * Instead of editing the chrome storage in application files.
 * Ceeate a helper action file that will handle all the logic for adding, editing and removing items from storage.
 */

 import { AtilaStorageArea, SavedScholarships } from "../models/AtilaStorageArea";
 import { GeneralNotes } from "../models/GeneralNotes";
 import { Collection } from "../models/Collection";
 import { Scholarship, SCHOLARSHIP_CREATION_SOURCE_CHROME_EXTENSION } from "../models/Scholarship";
 import AtilaAPI from "./AtilaAPI";
import { Utils } from "./Utils";
 // When running this project as a web app and not as a Chrome extension, we have to manually set the chrome environment variable
 const chrome: Window["chrome"] = window.chrome || {};
 export type SavedScholarshipCallback = (savedScholarships: SavedScholarships | GeneralNotes | Collection) => any;
 export enum ActionTypes {
     ADD = "ADD",
     GET = "GET",
     UPDATE = "UPDATE",
     DELETE = "DELETE",
 }
 
 class StorageHelper {
 
     static performAction = (actionType: ActionTypes, objectType: "savedScholarships" | "generalNotes" | "addCollection",
      targetObject: Scholarship | GeneralNotes | Collection | null, callback?: SavedScholarshipCallback) => {
         chrome.storage.local.get([objectType, "guestUserId"], (items: AtilaStorageArea) => {
 
             let storageData = items[objectType];
             let guestUserId = items.guestUserId;

             if (!guestUserId) {
                guestUserId = Utils.getRandomString();
                chrome.storage.local.set({ guestUserId });
             }

 
             if (actionType === ActionTypes.GET) {
                 if(callback) {
                     callback(storageData!)
                 }
                 return
             } else if (targetObject === null) {
                 throw new Error(`targetScholarship argument can only be null for the 'GET' action type. Action type '${actionType}' was received`);
             }

             if (objectType === "addCollection") {
                 StorageHelper.performAddCollectionAction(actionType, targetObject! as Collection, storageData as Collection)
             }
 
             if (objectType === "savedScholarships") {
                 storageData = StorageHelper.performSavedScholarshipsAction(actionType, targetObject! as Scholarship, storageData as SavedScholarships, guestUserId)
             }
 
             if (objectType === "generalNotes") {
                 storageData = StorageHelper.performGeneralNotesAction(actionType, targetObject! as GeneralNotes, storageData as GeneralNotes)
             }
             chrome.storage.local.set({ [objectType] : storageData }, function() {
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
                 targetObject.owner_guest_user_id = guestUserId;
                 // prevent the description from being blank by setting it as the name as a fallback
                 targetObject.description = targetObject.description || targetObject.name;
             }
             if (!targetObject.funding_amount) {
                targetObject.funding_amount = "0.00"
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
                 AtilaAPI.saveScholarship(targetObject)
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

     static performAddCollectionAction = (type: ActionTypes, targetObject: Collection, existingData: Collection | null) => {
         if (type === ActionTypes.ADD) {
            AtilaAPI.createCollection(targetObject)
                .then(res => console.log({res}))
                .catch(err => console.log({err}));
         }
     }
 }
 
 export default StorageHelper;