import { FC, useState } from 'react'
import { Calendar } from './Calendar'
import {
  createCalendar,
  getLocalTimeZone,
  parseDate,
  CalendarDate,
  today,
} from '@internationalized/date'
import { useDateFormatter } from 'react-aria'
import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import dayOfYear from 'dayjs/plugin/dayOfYear'

dayjs.extend(isoWeek)
dayjs.extend(dayOfYear)

const App: FC = () => {
  const now = today(getLocalTimeZone())
  const [date, setDate] = useState<CalendarDate>(now)
  const formatter = useDateFormatter({ dateStyle: 'full' })
  const localDate = date.toDate(getLocalTimeZone())
  const lastDayOfYear = dayjs(localDate).endOf('year')
  const totalDaysOfYear = lastDayOfYear.dayOfYear()
  const totalWeeksOfYear = lastDayOfYear.isoWeek()

  return (
    <div className="mx-auto w-fit">
      {date ? (
        <div>
          <p>Current date: {formatter.format(localDate)}</p>
          <p>
            Week of the year: {dayjs(localDate).isoWeek()} in {totalWeeksOfYear}
          </p>
          <p>
            Day of the year: {dayjs(localDate).dayOfYear()} in {totalDaysOfYear}
          </p>
        </div>
      ) : null}
      <Calendar value={date} onChange={setDate} />
    </div>
  )
}

export default App
