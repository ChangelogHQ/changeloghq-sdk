import { useRef } from "react"

export interface IUnredBadgeProps {
    width?: number
    unreadCount: number
    onClick?: () => void
}

function UnreadBadge(props: IUnredBadgeProps) {
    
    // define the element     
    const ref = useRef(null)
    
    // set the default value for the width
    const width = props.width || 16    

    // calculate the font size for the text
    const fontSizeLabel = (width / (.7 + (0.5 * props.unreadCount.toFixed(0).length))).toFixed(0) + 'px'        

    let targetX = 0
    let targetY = 0

    // get the parent element 
    const parentElement = ref.current && (ref.current as any).parentElement ? (ref.current as any).parentElement : undefined 

    // calculate the position of the parent element
    if (parentElement) {        
        const pos = parentElement.getBoundingClientRect()
        targetX = pos.x + pos.width
        targetY = pos.y        
    }
    
    // render the badge
    return (                
        <svg width={width} height={width} style={{position: "absolute", left: targetX, top: targetY, cursor: props.onClick ? 'pointer' : 'default' }} ref={ref} onClick={props.onClick}>
            <circle cx={width / 2} cy={width /2 } r={width /2 } fill="red" />
            <text x="50%" y="50%" textAnchor="middle" fill="white" fontSize={fontSizeLabel} fontFamily="Arial" dy=".35em">{props.unreadCount.toFixed(0)}</text>
        </svg>                
    )
}

export default UnreadBadge