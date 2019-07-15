import { useEffect } from 'react'
import { useEventCallback } from '@restart/hooks'

export const useHover = (ref, onHoverStart, onHoverEnd) => {
  const start = useEventCallback(onHoverStart)
  const end = useEventCallback(onHoverEnd)
  useEffect(() => {
    const element = ref.current
    if (!element) return
    element.addEventListener('mouseenter', start)
    element.addEventListener('mouseleave', end)
    return () => {
      element.removeEventListener('mouseenter', start)
      element.removeEventListener('mouseleave', end)
    }
  }, [end, ref, start])
}
