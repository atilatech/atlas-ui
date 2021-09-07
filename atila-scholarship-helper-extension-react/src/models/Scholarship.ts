import { Utils } from "../services/Utils";

export class Scholarship {
    
    public name: string = "";
    public description?: string = "";
    public deadline: string = Utils.currentDateMidnight();
    public notes?: string = "";
    public date_created?: string = "";
}