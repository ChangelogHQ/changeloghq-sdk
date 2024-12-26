import { useState } from 'react'
import './App.css'
import { ChangelogPopup, UnreadBadgeControlled } from './lib'


function App() {  
  const serviceUrl = 'https://changeloghq.github.io/jekyll-demo-changeloghq'

  const [changelogOpened, setChangelogOpened] = useState(false)
  
  return (
    <>
      <h1>
        <span>ChangelogHQ SDK Demo</span>
        <UnreadBadgeControlled url={serviceUrl} onClick={() => setChangelogOpened(true)} hideIfZero={true} color='black' backgroundColor='yellow' />
      </h1>
            
      <ChangelogPopup url={serviceUrl} visible={changelogOpened} autoAcknowledgeChangelog={true} onDismiss={() => setChangelogOpened(false)}/>
    </>
  )
}

export default App
