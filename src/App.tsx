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
import { getISOWeeks } from './utils'

dayjs.extend(isoWeek)
dayjs.extend(dayOfYear)

const App: FC = () => {
  const now = today(getLocalTimeZone())
  const [date, setDate] = useState<CalendarDate>(now)
  const formatter = useDateFormatter({ dateStyle: 'full' })
  const localDate = date.toDate(getLocalTimeZone())
  const lastDayOfYear = dayjs(localDate).endOf('year')
  const totalDaysOfYear = lastDayOfYear.dayOfYear()
  const totalWeeksOfYear = getISOWeeks(lastDayOfYear.year())

  return (
    <div className="mx-auto w-fit">
      <h2 className="text-3xl font-bold mt-10">What week of the year is it?</h2>
      {date ? (
        <div className="bg-slate-100 p-4 rounded-2xl mt-5">
          <p className="flex justify-between">
            <span>Current date:</span>
            <span className="font-bold">{formatter.format(localDate)}</span>
          </p>
          <p className="flex justify-between">
            <span>Week of the year:</span>
            <span className="font-bold">
              {dayjs(localDate).isoWeek()} in {totalWeeksOfYear}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Day of the year:</span>
            <span className="font-bold">
              {dayjs(localDate).dayOfYear()} in {totalDaysOfYear}
            </span>
          </p>
        </div>
      ) : null}
      <Calendar value={date} onChange={setDate} onFocusChange={setDate} />
    </div>
  )
}

export default App
