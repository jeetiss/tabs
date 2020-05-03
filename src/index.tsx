import React, {
  createContext,
  useState,
  useMemo,
  useContext,
  cloneElement,
  isValidElement
} from "react";

import useConstant from "use-constant";

type RegisteredElements = {
  tabs: number;
  panels: number;
};

type TabsState = [number, React.Dispatch<React.SetStateAction<number>>];

const TabsState = createContext<TabsState>([0, () => null]);
const Elements = createContext<RegisteredElements>({ tabs: 0, panels: 0 });

type TabsComponent = React.FC<{
  state?: TabsState;
}>;

export const Tabs: TabsComponent = ({ state: outerState, children }) => {
  const innerState = useState(0);
  const elements = useConstant(() => ({ tabs: 0, panels: 0 }));
  const state = outerState || innerState;

  return (
    <Elements.Provider value={elements}>
      <TabsState.Provider value={state}>{children}</TabsState.Provider>
    </Elements.Provider>
  );
};

export const useTabState = () => {
  const [activeIndex, setActive] = useContext(TabsState);
  const elements = useContext(Elements);

  const tabIndex = useConstant(() => {
    const currentIndex = elements.tabs;
    elements.tabs += 1;

    return currentIndex;
  });

  const onClick = useConstant(() => () => setActive(tabIndex));

  const state = useMemo(
    () => ({
      isActive: activeIndex === tabIndex,
      onClick
    }),
    [activeIndex, onClick, tabIndex]
  );

  return state;
};

export const usePanelState = () => {
  const [activeIndex] = useContext(TabsState);
  const elements = useContext(Elements);

  const panelIndex = useConstant(() => {
    const currentIndex = elements.panels;
    elements.panels += 1;

    return currentIndex;
  });

  return panelIndex === activeIndex;
};

export const Tab: React.FC = ({ children }) => {
  const state = useTabState();

  if (typeof children === "function") {
    return children(state);
  }

  return isValidElement(children)
    ? cloneElement<{
        isActive: boolean;
        onClick: () => void;
      }>(children, state)
    : children;
};

export const Panel: React.FC<{ active?: boolean }> = ({ active, children }) => {
  const isActive = usePanelState();

  return <>{isActive || active ? children : null}</>;
};
