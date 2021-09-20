/**
 * Utility class for mocking chrome and firefox APIs
 */
import { AtilaStorageArea } from '../models/AtilaStorageArea';
import SavedScholarships from './mock_data/SavedScholarships.json';

 export class ChromeMock {
     
    static storageData: AtilaStorageArea = {
        savedScholarships: SavedScholarships,
    }
     
}