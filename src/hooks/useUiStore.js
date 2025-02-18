// Hook que sirve para manejar y hacer dispatch de acciones y controlar a lo relacionado a UI Store,
import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {
    
    const dispatch = useDispatch();
    const { isDateModalOpen } = useSelector(state => state.ui);

    const openDateModal = () => {
        dispatch(onOpenDateModal());
    };

    const closeDateModal = () => {
        dispatch(onCloseDateModal());
    };

    return {
        isDateModalOpen,
        openDateModal,
        closeDateModal
    }
};