import { RefObject, useEffect, useState } from 'react'

const useCalcAnimationSizes = (
  shssContainerRef?: RefObject<HTMLElement> | undefined,
  shssRef?: RefObject<HTMLElement> | undefined,
  shssContentRef?: RefObject<HTMLElement> | undefined,
  wrapperRef?: RefObject<HTMLElement> | undefined,
  speed?: number,
  direction?: 'ltr' | 'rtl',
) => {
  const [startPos, setStartPos] = useState<number>(0)
  const [endPos, setEndPos] = useState<number>(0)
  const [startTrValue, setStartTrValue] = useState<number>(0)
  const [endTrValue, setEndTrValue] = useState<number>(0)

  const effectiveSpeed = speed !== undefined ? speed : 1

  useEffect(() => {
    const calculateSizes = () => {
      if (shssRef?.current && shssContentRef?.current && wrapperRef?.current) {
        const windowWidth = window.innerWidth
        const boxWidth = shssContentRef.current.offsetWidth
        const wrapperWidth = wrapperRef.current.offsetWidth

        if (wrapperRef.current.offsetWidth > windowWidth) {
          const offsetTop = shssRef.current.offsetTop
          const boxHeight = shssContentRef.current.offsetHeight
          const height = (boxWidth - windowWidth + boxHeight) * effectiveSpeed

          shssRef.current.style.height = `${height}px`

          setStartPos(offsetTop)
          setEndPos(height - (boxHeight - offsetTop))
          setStartTrValue(direction === 'ltr' ? 0 : -(wrapperWidth - windowWidth))
          setEndTrValue(direction === 'ltr' ? -(wrapperWidth - windowWidth) : 0)
        } else {
          shssRef.current.style.height = `auto`
          setStartPos(0)
          setEndPos(0)
          setStartTrValue(0)
          setEndTrValue(0)
        }
      }
    }

    calculateSizes()
    const handleResize = () => calculateSizes()
    const resizeObserver = new ResizeObserver(handleResize)
    if (shssContainerRef?.current) resizeObserver.observe(shssContainerRef?.current)

    return () => resizeObserver.disconnect()
  })

  return { startPos, endPos, startTrValue, endTrValue }
}

export default useCalcAnimationSizes
