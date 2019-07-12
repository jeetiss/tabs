import React from 'react'
import './App.css'
import './tabs.css'
import { Tabs, Tab, Panel } from 'react-tabs'

const TabButton = ({ isActive, onClick, children }) => (
  <button disabled={isActive ? true : null} className='tab' onClick={onClick}>
    {children}
  </button>
)

export default () => {
  return (
    <Tabs>
      <div className='tabs'>
        <div className='tab-list'>
          <Tab>
            <TabButton>tab 1</TabButton>
          </Tab>
          <Tab>
            <TabButton>tab 2</TabButton>
          </Tab>
          <Tab>
            <TabButton>tab 3</TabButton>
          </Tab>
        </div>

        <Panel>
          <h1>Hello World from React! 📦 🚀</h1>
        </Panel>
        <Panel>
          <h1>gcjcfxhfchxvhbmc</h1>
        </Panel>
        <Panel>
          <h1>rere</h1>
        </Panel>
      </div>
    </Tabs>
  )
}
