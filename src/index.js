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
  const elements = useConstant(() => ({ tabs: [], panels: [] }))
  const state = outerState || innerState

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={state}>{children}</TabsState.Provider>
    </Elements.Provider>
  )
}

export const useTabState = (children) => {
  const [activeIndex, setActive] = useContext(TabsState)
  const elements = useContext(Elements)

  const tabIndex = useConstant(() => {
    const currentIndex = elements.tabs.length
    const childrenIndex = elements.tabs.indexOf(children)

    const isChildrenUnique = !elements.tabs.includes(children)
    if (isChildrenUnique) {
      elements.tabs.push(children)
    }

    return isChildrenUnique ? currentIndex : childrenIndex
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

export const usePanelState = (children) => {
  const [activeIndex] = useContext(TabsState)
  const elements = useContext(Elements)

  const panelIndex = useConstant(() => {
    const currentIndex = elements.panels.length
    const childrenIndex = elements.panels.indexOf(children)

    const isChildrenUnique = !elements.panels.includes(children)
    if (isChildrenUnique) {
      elements.panels.push(children)
    }

    return isChildrenUnique ? currentIndex : childrenIndex
  })

  return panelIndex === activeIndex
}

export const Tab = ({ children }) => {
  const state = useTabState(children)

  if (typeof children === 'function') {
    return children(state)
  }

  return isValidElement(children) ? cloneElement(children, state) : children
}

export const Panel = ({ active, children }) => {
  const isActive = usePanelState(children)

  return isActive || active ? children : null
}
