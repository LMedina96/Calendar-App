import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"

const useCalendarStore = () => {

    const dispatch = useDispatch()

    const {events, activeEvent} = useSelector( state => state.calendar)

    const setActiveEvent = (calendarEvent) => {
      dispatch(onSetActiveEvent(calendarEvent))
    }

    const startSavingEvent = async(calendarEvent) => {
      //TODO: Llegar al backend

      if(calendarEvent._id) {
        //Actualizando
        dispatch(onUpdateEvent(calendarEvent))
      }else {
        //Creando
        dispatch(onAddNewEvent({...calendarEvent, _id: new Date().getTime()}))
      }
    }

    const startDeletingEvent = () => {
      dispatch(onDeleteEvent())
    }

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}

export default useCalendarStore
