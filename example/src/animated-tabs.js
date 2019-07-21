import React, { useState, useRef, useEffect, cloneElement } from 'react'
import { Tabs, useTabState, Panel } from '@bumaga/tabs'
import { motion, AnimatePresence } from 'framer-motion'

const cn = (...args) => args.filter(Boolean).join(' ')

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button className={cn('tab', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  )
}

const PanelList = ({ state, children }) => {
  const panelRef = useRef()
  const [height, set] = useState(0)
  const [activeIndex] = state

  useEffect(() => {
    panelRef.current && set(panelRef.current.offsetHeight)
  }, [activeIndex, set])

  return (
    <motion.ul className='panel-list' animate={{ height }}>
      <AnimatePresence initial={false}>
        <motion.li
          ref={panelRef}
          className='panel'
          key={activeIndex}
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.1, ease: 'easeInOut', duration: 0.2 } }}
          exit={{ opacity: 0, x: 32, transition: { ease: 'easeInOut', duration: 0.2 } }}
        >
          {cloneElement(children[activeIndex], { active: true })}
        </motion.li>
      </AnimatePresence>
    </motion.ul>
  )
}

export default () => {
  const state = useState(0)

  return (
    <Tabs state={state}>
      <div className='tabs'>
        <div className='tab-list'>
          <Tab>Tab 1</Tab>

          <Tab>Tab 2</Tab>

          <Tab>Tab 3</Tab>
        </div>

        <div className='tab-progress' />

        <PanelList state={state}>
          <Panel>
            <p>animations with framer/motion</p>
          </Panel>

          <Panel>
            <p>is pure</p>
          </Panel>

          <Panel>
            <p>❤️</p>
          </Panel>
        </PanelList>
      </div>
    </Tabs>
  )
}
