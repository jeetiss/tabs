import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  cloneElement,
  isValidElement
} from 'react'

import useConstant from 'use-constant'

const TabsState = createContext()
const Elements = createContext()

export const Tabs = ({ state: outerState, children }) => {
  const innerState = useState(0)
  const elements = useConstant(() => ({ tabs: 0, panels: 0 }))
  const state = outerState || innerState

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={state}>{children}</TabsState.Provider>
    </Elements.Provider>
  )
}

export const useTabState = () => {
  const [activeIndex, setActive] = useContext(TabsState)
  const elements = useContext(Elements)

  const tabIndex = useConstant(() => {
    const currentIndex = elements.tabs
    elements.tabs += 1

    return currentIndex
  })

  const onClick = useConstant(() => () => setActive(tabIndex))

  const state = useMemo(
    () => ({
      isActive: activeIndex === tabIndex,
      onClick
    }),
    [activeIndex, onClick, tabIndex]
  )

  return state
}

export const usePanelState = () => {
  const [activeIndex] = useContext(TabsState)
  const elements = useContext(Elements)

  const panelIndex = useConstant(() => {
    const currentIndex = elements.panels
    elements.panels += 1

    return currentIndex
  })

  return panelIndex === activeIndex
}

export const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState()

  if (typeof children === 'function') {
    return children({ isActive, onClick })
  }

  return isValidElement(children) ? cloneElement(children, { onClick }) : children
}

export const Panel = ({ active, children }) => {
  const isActive = usePanelState()

  return isActive || active ? children : null
}
