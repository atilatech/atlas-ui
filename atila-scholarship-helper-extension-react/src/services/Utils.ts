export class Utils {
    /**
     * @see: https://stackoverflow.com/a/61082536
     * set default time to 11:59PM of current date
     * @returns 
     */
    static currentDateMidnight = () => {
        const now = new Date();
        now.setUTCHours(23,59, 0o0, 0o0);
        const midnight = now.toISOString().slice(0,19);

        return midnight;
    }

    /**
     * @see: https://gist.github.com/gordonbrander/2230317
     * @param maxLength 
     * @returns 
     */
    static getRandomString = (maxLength=16) => {
        let randomString = '';
    
        for (let i =0; i< 4; i++) {
            randomString += Math.random().toString(36).substr(2, 8);
        }
        if (maxLength) {
            randomString = randomString.substring(0, maxLength);
        }
    
        return randomString;
    }
}