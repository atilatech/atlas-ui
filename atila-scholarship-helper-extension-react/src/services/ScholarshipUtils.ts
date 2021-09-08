import { Scholarship } from "../models/Scholarship";

export class ScholarshipUtils {
    /**
     * @see: https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs/blob/main/services/google.md
     * @see: https://stackoverflow.com/a/23495015
     * TODO: This breaks if we have: https://aynrand.org/students/essay-contests/#atlasshrugged-1
     * (the hash will cause other paremeters to be ignored, tempfix is putting the location parameter last)
     * @param {*} scholarship 
     */
    static generateCalendarLink(scholarship: Scholarship) {
        // %0A%0A = new line

        const eventDetails = `${scholarship.description}%0D%0A%0D%0A${scholarship.scholarship_url}%0D%0A%0D%0A${scholarship.notes}`;
    
        // Google Calendar deadline Expects the following format: YYYYMMDDTHHmmSSZ
        // Deadline is in the format 2021-09-06T15:17:00.000Z, we want: 20131206T050000Z
        let deadline = scholarship.deadline.replace("-", "").replace(":", "").replace("-", "").substring(0,16);

        const calendarUrlBase = `https://www.google.com/calendar/render`
        const calendarUrl = `${calendarUrlBase}?action=TEMPLATE&text=${scholarship.name}&dates=${deadline}/${deadline}&details=${eventDetails}&location=${scholarship.scholarship_url}`
    
        return calendarUrl;
    }
    
}