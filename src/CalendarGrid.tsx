import { useCalendarGrid, useLocale } from 'react-aria'
import { getWeeksInMonth } from '@internationalized/date'

import { CalendarCell } from './CalendarCell'
import { CalendarState } from 'react-stately'

export function CalendarGrid({ state, ...props }: { state: CalendarState }) {
  let { locale } = useLocale()
  let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state)

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale)

  return (
    <table {...gridProps} className="flex-1 border-spacing-0" cellPadding={0}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index}>{day}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                ),
              )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
