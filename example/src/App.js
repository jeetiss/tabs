import React, { useState, useRef } from 'react'
import './App.css'
import './tabs.css'
import { Tabs, useTabState, Panel } from 'restart-tabs'
import { useInterval } from '@restart/hooks'

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button className='tab' onClick={onClick} disabled={isActive ? true : null}>
      {children}
    </button>
  )
}

export default () => {
  const tabsRef = useRef()
  const [index, setIndex] = useState(0)
  const [paused, stop] = useState(false)

  useInterval(() => setIndex(index => (index + 1) % 3), 1000, paused)

  return (
    <div className='tabs' ref={tabsRef}>
      <Tabs state={[index, setIndex]}>
        <div className='tab-list'>
          <Tab>tab 1</Tab>

          <Tab>tab 2</Tab>

          <Tab>tab 3</Tab>
        </div>

        <Panel>
          <h1>Hello World from React 📦 🚀</h1>
        </Panel>

        <Panel>
          <h1>Tabs with hooks 🎣</h1>
        </Panel>

        <Panel>
          <h1>So nice 🚨</h1>
        </Panel>
      </Tabs>
    </div>
  )
}
