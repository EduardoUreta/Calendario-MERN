import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const AddNewEvent = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();
 
    const openModal = () => {
        setActiveEvent({
            title: "",
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Fernando'
            }
        }
        );
        openDateModal();
    };

  return (
    <button className="btn btn-primary float-button" onClick={openModal}>
        <i className="fas fa-plus"></i>
    </button>
  )
}
