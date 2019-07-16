import React from 'react'
import './App.css'
import './tabs.css'

import AnimatedTabs from './animated-tabs'
import AutoplayedTabs from './autoplayed-tabs'
import HeightTabs from './height-tabs'

export default () => {
  return (
    <>
      <HeightTabs />
      <AnimatedTabs />
      <AutoplayedTabs />
    </>
  )
}
