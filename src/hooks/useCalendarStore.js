import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import calendarApi from "../services/calendarApi"
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents"
import Swal from "sweetalert2"

const useCalendarStore = () => {

  const dispatch = useDispatch()

  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async (calendarEvent) => {
    //TODO: Llegar al backend

    try {

      if (calendarEvent.id) {
        //Actualizando
        await calendarApi.put(`events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }

      //Creando
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))

    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }


  }

  const startDeletingEvent = async () => {

    try {

      await calendarApi.delete(`events/${activeEvent.id}`)
      dispatch(onDeleteEvent())

    } catch (error) {
      console.log(error)
      Swal.fire('Error al eliminar evento', error.response.data.msg, 'error')
    }
  }

  const startLoadingEvents = async () => {
    try {

      const { data } = await calendarApi.get('/events')

      const events = convertEventsToDateEvents(data.events)
      dispatch(onLoadEvents(events))

    } catch (error) {
      console.log('Error al cargar los eventos')
      console.log(error)
    }
  }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
    startLoadingEvents
  }
}

export default useCalendarStore
