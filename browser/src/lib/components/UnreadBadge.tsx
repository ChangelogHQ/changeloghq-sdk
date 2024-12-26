import { useEffect, useRef, useState } from "react"

export interface IUnredBadgeProps {
    width?: number
    unreadCount: number
    onClick?: () => void

    color?: string
    backgroundColor?: string 

    left?: number
    top?: number
}

function UnreadBadge(props: IUnredBadgeProps) {
    
    // define the element     
    const ref = useRef<SVGSVGElement | null>(null)
    
    // define the target position
    const [targetPosition, setTargetPosition] = useState({x: 0, y: 0})

    // set the default value for the width
    const width = props.width || 16    

    // calculate the font size for the text
    const fontSizeLabel = (width / (.7 + (0.5 * props.unreadCount.toFixed(0).length))).toFixed(0) + 'px'        
    
    // calculate the colors 
    const bgColor = props.backgroundColor || 'red'
    const ftColor = props.color || 'white'

    // calculate the position as soone the component is mounted
    useEffect(() => {

        // check if the ref was set
        if (!ref.current) { return }

        // get the parent element 
        const parentElement = ref.current && (ref.current as any).parentElement ? (ref.current as any).parentElement : undefined 

        // check for the parent element 
        if (!parentElement) { return}

        // calculate the position of the parent element    
        const pos = parentElement.getBoundingClientRect()
        setTargetPosition({x: pos.x + pos.width, y: pos.y})                    

        // override postion
        if (props.left) {
            setTargetPosition({x: props.left, y: pos.y})        
        }

        if (props.top) {
            setTargetPosition({x: pos.x, y: props.top})        
        }

    }, [ref.current])

    // render the badge
    return (                
        <svg ref={ref} width={width} height={width} style={{position: "absolute", left: targetPosition.x, top: targetPosition.y, cursor: props.onClick ? 'pointer' : 'default' }} onClick={props.onClick}>
            <circle cx={width / 2} cy={width /2 } r={width /2 } fill={bgColor} />
            <text x="50%" y="50%" textAnchor="middle" fill={ftColor} fontSize={fontSizeLabel} fontFamily="Arial" dy=".35em">{props.unreadCount.toFixed(0)}</text>
        </svg>                
    )
}

export default UnreadBadge