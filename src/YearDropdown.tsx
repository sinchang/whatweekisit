import { CalendarDate } from '@internationalized/date'
import { useDateFormatter } from 'react-aria'
import { CalendarState } from 'react-stately'

export function YearDropdown({ state }: { state: CalendarState }) {
  let years: {
    value: CalendarDate
    formatted: string
  }[] = []
  let formatter = useDateFormatter({
    year: 'numeric',
    timeZone: state.timeZone,
  })

  // Format 20 years on each side of the current year according
  // to the current locale and calendar system.
  for (let i = -20; i <= 20; i++) {
    let date = state.focusedDate.add({ years: i })
    years.push({
      value: date,
      formatted: formatter.format(date.toDate(state.timeZone)),
    })
  }

  let onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let index = Number(e.target.value)
    let date = years[index].value
    state.setFocusedDate(date)
  }

  return (
    <select aria-label="Year" onChange={onChange} value={20}>
      {years.map((year, i) => (
        // use the index as the value so we can retrieve the full
        // date object from the list in onChange. We cannot only
        // store the year number, because in some calendars, such
        // as the Japanese, the era may also change.
        <option key={i} value={i}>
          {year.formatted}
        </option>
      ))}
    </select>
  )
}
