import React from 'react'
import './App.css'
import './tabs.css'

import AutoplayedTabs from './autoplayed-tabs'
import HeightTabs from './height-tabs'

export default () => {
  return (
    <>
      <HeightTabs />
      <AutoplayedTabs />
    </>
  )
}
