/**
 * A helper class to keep track of what items are stored in the Storage Area for this extension.
 */

import { GeneralNotes } from "./GeneralNotes";
import { Scholarship } from "./Scholarship";
import { Collection } from './Collection';

export interface SavedScholarships {
    [scholarshipId: string]: Scholarship
}

export interface AtilaStorageArea {
    savedScholarships?: SavedScholarships,
    generalNotes?: GeneralNotes,
    addCollection?: Collection,
    guestUserId?: string,
}
