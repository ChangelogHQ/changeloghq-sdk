import { useEffect, useState } from "react";
import { ChangelogUpdateManager } from "../services/ChangelogUpdatesManager";
import UnredBadge from "./UnredBadge";

export interface IUnredBadgeControlledProps {
    width?: number
    url: string
}

function UnredBadgeControlled(props: IUnredBadgeControlledProps) {

    const [unreadCount, setUnreadCount] = useState(0)

    useEffect(() => {
        ChangelogUpdateManager.detectUpdates(props.url).then((result) => {
            setUnreadCount(result.unreadCount)
        })

    }, [props.url])

    return (<UnredBadge width={props.width} unreadCount={unreadCount}/>)
}

export default UnredBadgeControlled