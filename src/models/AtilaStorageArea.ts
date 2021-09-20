/**
 * A helper class to keep track of what items are stored in the Storage Area for this extension.
 */

import { Scholarship } from "./Scholarship";

export interface SavedScholarships {
    [scholarshipId: string]: Scholarship
}

export interface AtilaStorageArea {
    savedScholarships?: SavedScholarships,
    generalNotes?: string
}
