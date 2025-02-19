import { addHours, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale/es';
import 'react-datepicker/dist/react-datepicker.css';
import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale("es", es)

export const CalendarModal = () => {
  const [ formValues, setFormValues ] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours( new Date(), 2),
  });

  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();
  const titleClass = useMemo(() => {
    if(!formSubmitted) return '';

    return (formValues.title.length > 0) ? 'is-valid' : 'is-invalid';
  }, [formValues.title, formSubmitted])

  useEffect(() => {
    if(activeEvent !== null){
        setFormValues({...activeEvent})
    }
  }, [activeEvent]);

  const onInputChanged = ({target}) => {
    setFormValues({
        ...formValues,
        [target.name]: target.value,
    });
  };

  const onDatechange = (e, changing) => {
    setFormValues({
        ...formValues,
        [changing]: e,
    })
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('xd');
    
    setFormSubmitted(true);

    const diference = differenceInMinutes(formValues.end, formValues.start);
    if(isNaN(diference) || diference <= 0) {
        Swal.fire({
            title: 'Fechas incorrectas',
            text: 'Por favor, ingresa fechas y horas válidas',
            icon: 'error',
            timer: 3000
        });
        return;
    }
    
    if(formValues.title.length <= 0) return;

    startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);

  }

  return (
    <>
      <Modal show={isDateModalOpen} onHide={onCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form className="container" onSubmit={onSubmit}>

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label><br/>
                    <DatePicker 
                        selected={formValues.start} 
                        className="form-control"
                        onChange={ (e) => onDatechange(e, 'start')}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label><br/>
                    <DatePicker 
                        selected={formValues.end} 
                        className="form-control"
                        onChange={ (e) => onDatechange(e, 'end')}
                        minDate={formValues.start}
                        dateFormat="Pp"
                        showTimeSelect
                        locale="es"
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className={`form-control ${ titleClass }`}
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={formValues.title}
                        onChange={onInputChanged}
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={formValues.notes}
                        onChange={onInputChanged}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onCloseModal}>
                        Close
                    </Button>
                    <Button type='submit' className="btn btn-primary btn-block" >
                        <i className="far fa-save"></i>
                        <span> Guardar</span>
                    </Button>
                </Modal.Footer>
            </form>
        </Modal.Body>

      </Modal>
    </>
  );
}
