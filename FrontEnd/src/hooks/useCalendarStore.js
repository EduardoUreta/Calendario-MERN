import { useDispatch, useSelector } from "react-redux";
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store";
import { convertEventsToDateEvents, getEnvVariables } from "../helpers";
import Swal from "sweetalert2";

const { VITE_API_URL } = getEnvVariables()

export const useCalendarStore = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
    };

    const startSavingEvent = async(calendarEvent) => {
        if(calendarEvent._id){
            try {
                const response = await fetch(`${VITE_API_URL}/events/${calendarEvent._id}`, {
                    method: "PUT",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(calendarEvent),
                    credentials: 'include',
                });
                const data = await response.json();

                if(!response.ok) return Swal.fire('Error al actualizar', data.message , 'error');
                
                dispatch(onUpdateEvent({...calendarEvent, user}));
            } catch (error) {
                console.error(error);
                Swal.fire('Error al actualizar','error')
            };
        } else {
            try {
                const response = await fetch(`${VITE_API_URL}/events`, {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(calendarEvent),
                    credentials: 'include',
                });
                const data = await response.json();
                                
                dispatch(onAddNewEvent({...calendarEvent, _id: data._id, user: user._id }));
                
            } catch (error) {
                console.error(error);
            };
        };
    };

    const startLoadingEvents = async() => {
        try {
            const response = await fetch(`${VITE_API_URL}/events`, {
                method: "GET",
                credentials: 'include',
            });
            const data = await response.json();
            const eventos = convertEventsToDateEvents(data.Eventos);
            dispatch(onLoadEvents(eventos))
        } catch (error) {
            console.log('Error cargando eventos');
            console.error(error);
        }
    };

    const startDeleteEvent = async() => {
        try {
            const response = await fetch(`${VITE_API_URL}/events/${activeEvent._id}`, {
                method: "DELETE",
                credentials: 'include',
            });
            const data = await response.json();

            if(!response.ok) return Swal.fire('Error al eliminar', data.message , 'error');

            dispatch(onDeleteEvent());
            Swal.fire('Haz eliminado un evento', data.message , 'success');
        } catch (error) {
            console.log('Error eliminando el evento');
            console.error(error);
        }
    };

    return {
        events,
        activeEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
        startDeleteEvent
    }       
};