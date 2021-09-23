import { Utils } from "../services/Utils";

export const SCHOLARSHIP_CREATION_SOURCE_CHROME_EXTENSION = "chrome_extension"
export class Scholarship {
    
    public id: string = Utils.getRandomString();
    public owner_guest_user_id: string = Utils.getRandomString();
    public creation_source: string = SCHOLARSHIP_CREATION_SOURCE_CHROME_EXTENSION;
    public name: string = "";
    public description?: string = "";
    public scholarship_url?: string = "";
    public deadline: string = Utils.currentDateMidnight();
    public notes?: string = "";
    public date_created?: string = "";
    public date_modified?: string = "";
}