import { useDateFormatter } from 'react-aria'
import { CalendarState } from 'react-stately'

export function MonthDropdown({ state }: { state: CalendarState }) {
  let months: string[] = []
  let formatter = useDateFormatter({
    month: 'long',
    timeZone: state.timeZone,
  })

  // Format the name of each month in the year according to the
  // current locale and calendar system. Note that in some calendar
  // systems, such as the Hebrew, the number of months may differ
  // between years.
  let numMonths = state.focusedDate.calendar.getMonthsInYear(state.focusedDate)
  for (let i = 1; i <= numMonths; i++) {
    let date = state.focusedDate.set({ month: i })
    months.push(formatter.format(date.toDate(state.timeZone)))
  }

  let onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let value = Number(e.target.value)
    let date = state.focusedDate.set({ month: value })
    state.setFocusedDate(date)
  }

  return (
    <select
      aria-label="Month"
      onChange={onChange}
      value={state.focusedDate.month}
    >
      {months.map((month, i) => (
        <option key={i} value={i + 1}>
          {month}
        </option>
      ))}
    </select>
  )
}
