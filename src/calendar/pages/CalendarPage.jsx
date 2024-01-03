import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar } from 'react-big-calendar'
import { addHours, lastDayOfWeek } from 'date-fns'
import { localizer } from '../../helpers/calendarLocalizer'

import { getMessageES } from '../../helpers/getMessages'
import NavBar from "../components/NavBar"
import CalendarEvent from '../components/CalendarEvent'
import { useState } from 'react'
import CalendarModal from '../components/CalendarModal'
import { useUiStore } from '../../hooks/useUiStore'
import useCalendarStore from '../../hooks/useCalendarStore'
import FabAddNew from '../components/FabAddNew'
import FabDelete from '../components/FabDelete'

const CalendarPage = () => {

  const {openDateModal} = useUiStore()
  const {events, setActiveEvent} = useCalendarStore()
  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }

    return { style }
  }

  const onDoubleClick = () => {
    openDateModal()
  }

  const onSelect = (event) => {
    setActiveEvent(event)
  }

  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event)
  }

  return (
    <>
      <NavBar />

      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 80px)' }}
        messages={getMessageES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}

export default CalendarPage