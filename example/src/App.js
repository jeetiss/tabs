import React, { useState, useRef } from 'react'
import './App.css'
import './tabs.css'
import { Tabs, useTabState, Panel } from 'restart-tabs'
import { useInterval } from '@restart/hooks'
import { motion } from 'framer-motion'

import { useHover } from './useHover'

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button className='tab' onClick={onClick} disabled={isActive ? true : null}>
      {children}
    </button>
  )
}

const duration = 2
const variants = {
  pd: { scaleX: 1 },
  pl: { scaleX: 0 }
}

export default () => {
  const tabsRef = useRef()
  const [index, setIndex] = useState(0)
  const [paused, stop] = useState(false)

  useHover(tabsRef, () => stop(true), () => stop(false))
  useInterval(() => setIndex(index => (index + 1) % 3), duration * 1000, paused)

  return (
    <div className='tabs' ref={tabsRef}>
      <Tabs state={[index, setIndex]}>
        <div className='tab-list'>
          <Tab>tab 1</Tab>

          <Tab>tab 2</Tab>

          <Tab>tab 3</Tab>
        </div>

        <motion.div
          className='tab-progress'
          key={index}
          initial={{ scaleX: 1 }}
          variants={variants}
          animate={paused ? 'pd' : 'pl'}
          transition={
            paused
              ? { ease: 'easeInOut', duration: 0.16 }
              : { ease: 'linear', duration }
          }
        />

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
