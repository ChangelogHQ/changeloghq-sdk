export class ChangelogAccessMonitor {
    
    // define a constant used in localstorage
    private static readonly LAST_READ_KEY = 'changeloghq.lastRead';

    getLastTouch(): Date | undefined {
        // read the last time the system read the changelog
        const lastReadDateString = localStorage.getItem(ChangelogAccessMonitor.LAST_READ_KEY) 

        // convert to date
        return lastReadDateString ? new Date(lastReadDateString) : undefined;
    }

    touch() {
        // write the current time to localstorage
        localStorage.setItem(ChangelogAccessMonitor.LAST_READ_KEY, new Date().toISOString())
    }

    reset(to: string | undefined) {
        // remove the last read time
        localStorage.removeItem(ChangelogAccessMonitor.LAST_READ_KEY)

        // set to a target value 
        if (to) {
            localStorage.setItem(ChangelogAccessMonitor.LAST_READ_KEY, to)
        }
    }
}