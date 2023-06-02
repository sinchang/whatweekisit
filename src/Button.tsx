import React, { useRef } from 'react'
import { AriaButtonProps, useButton } from 'react-aria'

export function Button(props: AriaButtonProps) {
  let ref = useRef(null)
  let { buttonProps } = useButton(props, ref)
  return (
    <button {...buttonProps} ref={ref}>
      {props.children}
    </button>
  )
}
