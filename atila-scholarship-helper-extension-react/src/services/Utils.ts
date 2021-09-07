export class Utils {

    static currentDateMidnight = () => {
        // https://stackoverflow.com/a/61082536
        const now = new Date();
        // set default time to 11:59PM of current date
        now.setUTCHours(23,59, 0o0, 0o0);
        const deadline = now.toISOString().slice(0,19);

        return deadline;
    }
}