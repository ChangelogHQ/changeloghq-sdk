import { useEffect, useRef, useState } from 'react'
import './App.css'
import { ChangelogUpdateManager, IChangelogItemStateful, UnreadBadgeControlled } from './lib'


function App() {
  const [changeLog, setChangeLog] = useState<IChangelogItemStateful[]>([])
  const [unreadCount, setUnreadCount] = useState<number>(0)

  const serviceUrl = 'https://changeloghq.github.io/jekyll-demo-changeloghq'

  const detectChanges = () => {
    ChangelogUpdateManager.detectUpdates(serviceUrl).then((result) => {
      setChangeLog(result.latestChanges)
      setUnreadCount(result.unreadCount)            
    })    
  }

  useEffect(() => {
    detectChanges()
  }, [])
  
  const onRead = () => {
    ChangelogUpdateManager.acknowledgeUpdates()
    detectChanges()    
  }

  const onReset = () => {
    ChangelogUpdateManager.resetUpdates() 
    detectChanges()    
  }

  const onResetToDec21 = () => {
    ChangelogUpdateManager.resetUpdates('2024-12-21T23:08:43.088Z')
    detectChanges()    
  }

  return (
    <>
      <h1>
        <span>ChangelogHQ SDK Demo</span>
        <UnreadBadgeControlled url={serviceUrl} allowPopup={true}/>
      </h1>
      
      <p className="read-the-docs">
        This are the latest changes from the ChangelogHQ Demo Page
      </p>

      <p>
        Unread: {unreadCount}
        &nbsp;<a href="#" onClick={onRead} >Read</a> - <a href="#" onClick={onReset} >Reset</a> - <a href="#" onClick={onResetToDec21} >Reset to 12/21/2024</a>
      </p>
      <div style={{textAlign: 'left'}}>
        <ul className='changelogitems'>
          { changeLog.map((item) => (
            <li key={item.Id} className={item.isRead ? 'read' : 'new'}>{item.Title} from {item.PublishedAt.toDateString()}</li>
          )) }
        </ul>
      </div>
    </>
  )
}

export default App
