import React, { useEffect, useRef, ReactNode, memo, RefObject } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import clsx from 'clsx'
import { springConfig } from 'animations'
import { useCalcAnimationSizes } from 'hooks'
import './styles.css'

type ShssWrapperProps = {
  children?: ReactNode
  key?: string
  direction?: 'ltr' | 'rtl'
  shssRef?: RefObject<HTMLElement> | undefined
  shssContainerRef?: RefObject<HTMLElement> | undefined
  shssContentRef?: RefObject<HTMLElement> | undefined
  speed?: number
  transitionPositions?: (start: number, end: number) => void
}

const ShssWrapper = ({
  children,
  key,
  direction = 'ltr',
  shssRef,
  shssContainerRef,
  shssContentRef,
  speed = 1,
  transitionPositions,
}: ShssWrapperProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null)

  const { startPos, endPos, startTrValue, endTrValue } = useCalcAnimationSizes(
    shssContainerRef,
    shssRef,
    shssContentRef,
    wrapperRef,
    speed,
    direction,
  )

  useEffect(() => transitionPositions && transitionPositions(startPos, endPos), [startPos, endPos, transitionPositions])

  const { scrollY } = useScroll()
  const transformX = useSpring(scrollY, springConfig)
  const x = useTransform(transformX, [startPos, endPos], [startTrValue, endTrValue])

  return (
    <div className='Shss-wrapper'>
      <motion.div
        ref={wrapperRef}
        className={clsx('Shss-slides', {
          'Shss-direction-ltr': direction === 'ltr',
          'Shss-direction-rtl': direction === 'rtl',
        })}
        key={key}
        style={{ x }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export default memo<ShssWrapperProps>(ShssWrapper)
