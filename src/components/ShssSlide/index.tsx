import React, { memo, ReactNode, useRef } from 'react'
import { useInView } from 'framer-motion'
import clsx from 'clsx'
import './styles.css'

type ShssSlideProps = {
  children?: ReactNode
}

const ShssSlide = ({ children }: ShssSlideProps) => {
  const shssSlideRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(shssSlideRef, { once: false })

  return (
    <div className={clsx('Shss-slide', { 'Shss-slide-active': isInView })}>
      <div className='Shss-slide-active-points' ref={shssSlideRef}></div>
      <div className='Shss-slide-item'>{children}</div>
    </div>
  )
}

export default memo<ShssSlideProps>(ShssSlide)
