import { useEffect, useState } from "react";
import { ChangelogUpdateManager } from "../services/ChangelogUpdatesManager";
import UnredBadge from "./UnreadBadge";
import { ChangelogAccessMonitor } from "../services/ChangelogAccessMonitor";

export interface IUnredBadgeControlledProps {
    width?: number
    url: string
    onClick?: () => void
    
    hideIfZero?: boolean

    color?: string
    backgroundColor?: string 

    left?: number
    top?: number
}

function UnreadBadgeControlled(props: IUnredBadgeControlledProps) {

    const [unreadCount, setUnreadCount] = useState(0)            
    const [lastCheckForChanges, setLastCheckForChanges] = useState<Date | undefined>(undefined)
    
    const checkForChanges = (lastKnownTouch?: Date) => {

        // get the time last time the system was touched
        const lastTouch = ChangelogAccessMonitor.getLastTouch()
        
        // check if the time in the local storage is differnt then the time in the cache 
        if (!lastTouch || lastKnownTouch?.toISOString() === lastTouch.toISOString()) {
            setInterval(() => { 
                checkForChanges(lastTouch)
            }, 1000)
        } else {        
            // check for changes
            ChangelogUpdateManager.detectUpdates(props.url).then((result) => {

                // update the unread count
                setUnreadCount(result.unreadCount)

                // establish the loop 
                setInterval(() => { 
                    checkForChanges(lastTouch)
                }, 1000)
            })
        }
    }

    useEffect(() => {
        
        // establish a loop every second to check the changes
        setInterval(() => {

            // console.log("Checking loop...")

            // get the last touch time the system stored on the local storage
            const lastTouch = ChangelogAccessMonitor.getLastTouch()

            // if the lastTouch is not equal the last check of this component execute a network check 
            setLastCheckForChanges(prevLastCheckForChanges => 
                !prevLastCheckForChanges || prevLastCheckForChanges.toISOString() !== lastTouch?.toISOString() 
                ? lastTouch 
                : prevLastCheckForChanges
            )            

        }, 2000)
    }, [])    

    useEffect(() => {

        // console.log("Checking for changes...")        
        ChangelogUpdateManager.detectUpdates(props.url).then((result) => {

            // update the unread count
            setUnreadCount(result.unreadCount)                        
        })
    
    }, [lastCheckForChanges])
    
    if (props.hideIfZero && unreadCount === 0) {
        return (<></>)
    } else {
        return (<UnredBadge {...props} unreadCount={unreadCount} />)
    }
}

export default UnreadBadgeControlled