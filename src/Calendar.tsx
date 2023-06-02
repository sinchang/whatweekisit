import {
  useCalendar,
  useLocale,
  useDateFormatter,
  AriaCalendarProps,
} from 'react-aria'
import { useCalendarState } from 'react-stately'
import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'
import { useState } from 'react'

import { CalendarGrid } from './CalendarGrid'
import { Button } from './Button'

export function Calendar(props: AriaCalendarProps<CalendarDate>) {
  let { locale } = useLocale()
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  })

  let { calendarProps, prevButtonProps, nextButtonProps } = useCalendar(
    props,
    state,
  )

  return (
    <div {...calendarProps} className="calendar">
      <div className="header">
        <Button {...prevButtonProps}>&lt;</Button>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  )
}
