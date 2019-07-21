import React from 'react'
import { Tabs, useTabState, usePanelState } from '@bumaga/tabs'
import { motion } from 'framer-motion'

import './accordion.css'

const cn = (...args) => args.filter(Boolean).join(' ')

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button
      className={cn('accordion-tab', isActive && 'active')}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

const panel = {
  hidden: { height: 0 },
  visible: { height: 'auto' }
}

const Panel = ({ children }) => {
  const isActive = usePanelState()

  return (
    <motion.div
      className='accordion-panel'
      animate={isActive ? 'visible' : 'hidden'}
      variants={panel}
    >
      {children}
    </motion.div>
  )
}

export default () => {
  return (
    <Tabs>
      <div className='accordion'>
        <Tab>Tab 1</Tab>
        <Panel>
          <p>
            Creates a MotionValue that, when set, will use a spring animation to
            animate to its new state.
          </p>
        </Panel>

        <Tab>Tab 2</Tab>
        <Panel>
          <p>
            In sociology, anthropology, and linguistics, structuralism is the
            methodology that implies elements of human culture must be
            understood by way of their relationship to a broader, overarching
            system or structure. It works to uncover the structures that
            underlie all the things that humans do, think, perceive, and feel.
            Alternatively, as summarized by philosopher Simon Blackburn,
            structuralism is "the belief that phenomena of human life are not
            intelligible except through their interrelations. These relations
            constitute a structure, and behind local variations in the surface
            phenomena there are constant laws of abstract structure".
          </p>
        </Panel>

        <Tab>Tab 3</Tab>
        <Panel>
          <p>
            The input range must be a linear series of numbers. The output range
            can be any value type supported by Framer Motion: numbers, colors,
            shadows, etc.
          </p>
        </Panel>
      </div>
    </Tabs>
  )
}
