import ReservationTable from 'components/ReservationTable/ReservationTable'
import { ModeratorProvider } from 'contexts/moderProvider'

export default async function CalendarPage() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ModeratorProvider>
        <ReservationTable />
      </ModeratorProvider>
    </div>
  )
}
