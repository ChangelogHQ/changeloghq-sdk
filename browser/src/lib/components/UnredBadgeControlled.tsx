import { useEffect, useState } from "react";
import { ChangelogUpdateManager } from "../services/ChangelogUpdatesManager";
import UnredBadge from "./UnreadBadge";

export interface IUnredBadgeControlledProps {
    width?: number
    url: string
    onClick?: () => void
}

function UnreadBadgeControlled(props: IUnredBadgeControlledProps) {

    const [unreadCount, setUnreadCount] = useState(0)    

    useEffect(() => {
        ChangelogUpdateManager.detectUpdates(props.url).then((result) => {
            setUnreadCount(result.unreadCount)
        })

    }, [props.url])
    
    return (<UnredBadge width={props.width} unreadCount={unreadCount} onClick={props.onClick}/>)
}

export default UnreadBadgeControlled