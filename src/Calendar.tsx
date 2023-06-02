import {
  useCalendar,
  useLocale,
  useDateFormatter,
  AriaCalendarProps,
} from 'react-aria'
import { useCalendarState } from 'react-stately'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import {
  CalendarDate,
  createCalendar,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'
import { useState } from 'react'

import { CalendarGrid } from './CalendarGrid'
import { Button } from './Button'
import { YearDropdown } from './YearDropdown'
import { MonthDropdown } from './MonthDropdown'

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
    <div {...calendarProps} className="mt-5">
      <div className="flex items-center py-4">
        <Button {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </Button>
        <div className="flex flex-1 gap-4 justify-center">
          <MonthDropdown state={state} />
          <YearDropdown state={state} />
        </div>
        <Button {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex">
        <CalendarGrid state={state} />
      </div>
    </div>
  )
}
