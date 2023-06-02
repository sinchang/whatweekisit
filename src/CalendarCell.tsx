import { CalendarDate } from '@internationalized/date'
import React from 'react'
import { useCalendarCell } from 'react-aria'
import { CalendarState } from 'react-stately'

export function CalendarCell({
  state,
  date,
}: {
  state: CalendarState
  date: CalendarDate
}) {
  let ref = React.useRef(null)
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref)

  return (
    <td {...cellProps} className="py-0.5 text-center">
      <div className="w-10 h-10 outline-none inline-block">
        <div
          {...buttonProps}
          ref={ref}
          hidden={isOutsideVisibleRange}
          className={`w-full h-full rounded-full outline-none flex items-center justify-center ${
            isDisabled ? 'text-gray-400' : ''
          } ${
            isSelected ? 'bg-violet-600 text-white hover:bg-violet-700' : ''
          } ${
            !isSelected && !isDisabled ? 'hover:bg-violet-100' : ''
          } cursor-default`}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  )
}
