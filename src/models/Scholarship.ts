import { Utils } from "../services/Utils";

export class Scholarship {
    
    public id: string = Utils.getRandomString();
    public name: string = "";
    public description?: string = "";
    public scholarship_url?: string = "";
    public deadline: string = Utils.currentDateMidnight();
    public notes?: string = "";
    public date_created?: string = "";
    public date_modified?: string = "";
}