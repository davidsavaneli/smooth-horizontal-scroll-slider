import React, { ReactNode, memo, useRef, useState, cloneElement } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import clsx from 'clsx'
import { springConfig } from 'animations'
import './styles.css'

type ProgressBarProps = {
  position?: 'top' | 'bottom'
  show?: boolean
}

type ShssProps = {
  children?: ReactNode
  speed?: number
  progressBar?: ProgressBarProps
}

const mergeProgressBarProps = (props?: ProgressBarProps): ProgressBarProps => {
  const defaultProgressBar = {
    position: 'top' as const,
    show: true,
  }

  return {
    ...defaultProgressBar,
    ...props,
  } as ProgressBarProps
}

const Shss = ({ children, speed, progressBar }: ShssProps) => {
  const progressBarProps = mergeProgressBarProps(progressBar)

  const [startPos, setStartPos] = useState<number>(0)
  const [endPos, setEndPos] = useState<number>(0)

  const shssRef = useRef<HTMLDivElement>(null)
  const shssContainerRef = useRef<HTMLDivElement>(null)
  const shssContentRef = useRef<HTMLDivElement>(null)

  const transitionPositions = (start: number, end: number) => {
    setStartPos(start)
    setEndPos(end)
  }

  const { scrollY } = useScroll()

  const scaleX = useSpring(scrollY, springConfig)
  const progressBarScale = useTransform(scaleX, [startPos, endPos], [0, 1])

  if (!children) return null

  const childArray = Array.isArray(children) ? children : [children]

  return (
    <div className='Shss' ref={shssRef}>
      <motion.div className='Shss-container' ref={shssContainerRef}>
        <motion.div className='Shss-content' ref={shssContentRef}>
          {childArray.map((child, index) =>
            cloneElement(child, {
              key: `Shss-wrapper-key-${index}`,
              shssRef: shssRef,
              shssContainerRef: shssContainerRef,
              shssContentRef: shssContentRef,
              speed: speed,
              transitionPositions: transitionPositions,
            }),
          )}
        </motion.div>
        {progressBarProps?.show && endPos !== 0 && (
          <motion.div
            className={clsx('Shss-progress-bar', {
              'Shss-progress-bar-position-top': progressBarProps?.position === 'top',
              'Shss-progress-bar-position-bottom': progressBarProps?.position === 'bottom',
            })}
            style={{ scaleX: progressBarScale }}
          />
        )}
      </motion.div>
    </div>
  )
}

export default memo<ShssProps>(Shss)
