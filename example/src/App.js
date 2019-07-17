import React from 'react'
import './App.css'
import './tabs.css'

import SimpleTabs from './simple-tabs'
import AnimatedTabs from './animated-tabs'
import AutoplayedTabs from './autoplayed-tabs'
import HeightTabs from './height-tabs'

export default () => {
  return (
    <>
      <SimpleTabs />
      <HeightTabs />
      <AnimatedTabs />
      <AutoplayedTabs />
    </>
  )
}
