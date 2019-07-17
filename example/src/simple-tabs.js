import React from 'react'
import { Tabs, useTabState, Panel } from 'restart-tabs'

const cn = (...args) => args.filter(Boolean).join(' ')

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  return (
    <button className={cn('tab', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  )
}

export default () => (
  <Tabs>
    <div className='tabs'>
      <div className='tab-list'>
        <Tab>Tab 1</Tab>

        <Tab>Tab 2</Tab>

        <Tab>Tab 3</Tab>
      </div>

      <div className='tab-progress' />

      <Panel>
        <p>
          In sociology, anthropology, and linguistics, structuralism is the
          methodology that implies elements of human culture must be understood
          by way of their relationship to a broader, overarching system or
          structure. It works to uncover the structures that underlie all the
          things that humans do, think, perceive, and feel. Alternatively, as
          summarized by philosopher Simon Blackburn, structuralism is "the
          belief that phenomena of human life are not intelligible except
          through their interrelations. These relations constitute a structure,
          and behind local variations in the surface phenomena there are
          constant laws of abstract structure".
        </p>
      </Panel>

      <Panel>
        <p>
          The input range must be a linear series of numbers. The output range
          can be any value type supported by Framer Motion: numbers, colors,
          shadows, etc.
        </p>
      </Panel>

      <Panel>
        <p>
          Creates a MotionValue that, when set, will use a spring animation to
          animate to its new state.
        </p>
      </Panel>
    </div>
  </Tabs>
)
