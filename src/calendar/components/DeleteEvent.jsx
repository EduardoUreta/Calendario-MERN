import { addHours } from "date-fns";
import { useCalendarStore } from "../../hooks"

export const DeleteEvent = () => {

    const { startDeleteEvent, activeEvent } = useCalendarStore();

    const onDeleteEvent = () => {
        startDeleteEvent();
    };


  return (
    <button 
        className="btn btn-danger float-button-delete" 
        onClick={onDeleteEvent}
        style={{ display: activeEvent ? "" : "none" }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
