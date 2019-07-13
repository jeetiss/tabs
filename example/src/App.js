import React from 'react'
import './App.css'
import './tabs.css'
import { Tabs, useTabState, Panel } from 'restart-tabs'

const TabButton = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button disabled={isActive ? true : null} className='tab' onClick={onClick}>
      {children}
    </button>
  )
}

export default () => {
  return (
    <Tabs>
      <div className='tabs'>
        <div className='tab-list'>
          <TabButton>tab 1</TabButton>

          <TabButton>tab 2</TabButton>

          <TabButton>tab 3</TabButton>
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
