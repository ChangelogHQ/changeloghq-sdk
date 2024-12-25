import { ChangelogClient } from "../api/ChangelogClient";
import { ChangelogAccessMonitor } from "./ChangelogAccessMonitor";
import { IChangelogItemStateful } from "./models/IChangelogItemStateful";

export class ChangelogUpdateManager {
 
    public static detectUpdates(serviceUri: string): Promise<{latestChanges: IChangelogItemStateful[], unreadCount: number}> {
    
        // get the latest changes
        const client = new ChangelogClient(serviceUri)
        return client.fetchLatestChanges().then((items) => {    
            
            // get the last readtime            
            const lastReadTime = ChangelogAccessMonitor.getLastTouch();
    
            // set the unread counter
            let unreadCounter = 0
    
            // process every item
            const statefulItems: IChangelogItemStateful[] = items.map(item => {
                const isRead = lastReadTime && item.PublishedAt <= lastReadTime
                if (!isRead) { unreadCounter++ }
    
                return {
                    ...item,
                    isRead: isRead ? true : false
                }
            })
            
            // done
            return {
                latestChanges: statefulItems,
                unreadCount: unreadCounter
            }
        })   
    } 

    public static acknowledgeUpdates() {
    
        // touch the via access monitor        
        ChangelogAccessMonitor.touch();
    }

    public static resetUpdates(to?: string) {    
        // touch the via access monitor        
        ChangelogAccessMonitor.reset(to);
    }
}