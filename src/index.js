import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  useRef,
  cloneElement,
  isValidElement
} from 'react'

const useConstant = fn => {
  const ref = useRef()

  if (!ref.current) {
    ref.current = { v: fn() }
  }

  return ref.current.v
}

const TabsState = createContext()
const Registered = createContext()

export const Tabs = ({ state: outerState, children }) => {
  const innerState = useState(0)
  const elements = useConstant(() => ({ tabs: new Set(), panels: new Set() }))
  const state = outerState || innerState

  return (
    <Registered.Provider value={elements}>
      <TabsState.Provider value={state}>{children}</TabsState.Provider>
    </Registered.Provider>
  )
}

export const Tab = ({ children }) => {
  const [activeIndex, setActive] = useContext(TabsState)
  const { tabs } = useContext(Registered)

  const tabIndex = useConstant(() => {
    const currentIndex = tabs.size
    tabs.add(currentIndex)
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

  if (typeof children === 'function') {
    return children(state)
  }

  return isValidElement(children) ? cloneElement(children, state) : children
}

export const Panel = ({ children }) => {
  const [activeIndex] = useContext(TabsState)
  const { panels } = useContext(Registered)

  const panelIndex = useConstant(() => {
    const currentIndex = panels.size
    panels.add(currentIndex)

    return currentIndex
  })

  return panelIndex === activeIndex ? children : null
}
