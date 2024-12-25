import { CSSProperties } from "react"
import { ChangelogAccessMonitor } from "../services/ChangelogAccessMonitor"

export interface IChangelogPopupProps {
    url: string
    visible: boolean
    title?: string

    autoAcknowledgeChangelog?: boolean

    onDismiss?: () => void
}

function ChangelogPopup(props: IChangelogPopupProps) {

    // define the CSS properties
    const styleModal: CSSProperties = {
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        display: props.visible ? 'block' : 'none'
    }

    const styleModalMain: CSSProperties = {
        display: 'block',
        position: 'fixed', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        backgroundColor: 'white', 
        padding: '0', 
        borderRadius: '5px',
        width: '80%', 
        maxWidth: '800px',
        height: '90%',
        maxHeight: '90%',
        overflow: 'hidden'
    }

    const styleHeader: CSSProperties = {
        display: 'flex',
        color: 'rgb(22, 30, 46)',
        padding: '15px 20px',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e5e7eb'
    }
    
    const styleMain: CSSProperties = {
        display: 'block',
        height: '100%'
    }

    const onDismiss = () => {

        // set chnanges as read
        if (props.autoAcknowledgeChangelog) {            
            ChangelogAccessMonitor.touch()
        }

        // close the dialog
        props.onDismiss && props.onDismiss()
    }
        
    return (
        <div style={styleModal}>
            <div style={styleModalMain}>
                <div className="changelog-header" style={styleHeader}>
                    <span>{props.title ? props.title : 'Changelog'}</span>                      
                    <svg width="24" height="24" viewBox="0 0 24 24" cursor={'pointer'} onClick={() => onDismiss()}>
                        <path d="M6 18L18 6M6 6l12 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>                                      
                </div>                    
                <div className="changelog-content" style={styleMain}>
                    <iframe src={props.url} style={{width: '100%', height: '100%', border: 'none'}}></iframe>
                </div>                            
            </div>
        </div>
    )
}

export default ChangelogPopup
