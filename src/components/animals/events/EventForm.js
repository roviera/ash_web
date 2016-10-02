import React, { PropTypes } from 'react';
import Input from '../../common/Input';
import ImagesDropzone from '../../common/ImagesDropzone';
import ModalAnimalButtons from '../../common/ModalAnimalButtons';
import DatePickerInput from '../../common/DatePickerInput';
import 'react-datepicker/dist/react-datepicker.css';
import '../../../styles/events.scss';

const EventForm = ({ event, images, mobile, onSave, onChange, onChangeDate, onCancel, onDrop, onDelete, errors }) => {

  return (
    <div className="form-container">
      <p> * campos necesarios </p>
      <div className="animal-form">
        <Input styleClass="animal-input title-input"
                name="name"
                label="TÍTULO *"
                type="text"
                value={event.name}
                onChange={onChange}
                error={errors.name}
                 />
        <DatePickerInput styleClass="animal-input date-input"
                          name="date"
                          label="FECHA *"
                          selected={event.date}
                          locale="es"
                          mobile={mobile}
                          onChange={onChangeDate}
                          error={errors.date} />
        <Input styleClass="animal-input description-input"
                name="description"
                label="DESCRIPCIÓN"
                type="textarea"
                value={event.description}
                onChange={onChange}
                error={errors.description} />
      </div>
      <div className="dropzones-container">
        <ImagesDropzone title="GALERÍA"
                        images={images}
                        onDrop={onDrop}
                        onDelete={onDelete} />
      </div>
      <ModalAnimalButtons onSubmit={onSave} onClose={onCancel} />
    </div>
  );
};

const { object, func, array, bool } = PropTypes;

EventForm.propTypes = {
  event: object.isRequired,
  images: array.isRequired,
  mobile: bool,
  onSave: func.isRequired,
  onChange: func.isRequired,
  onChangeDate: func.isRequired,
  onCancel: func.isRequired,
  onDrop: func.isRequired,
  onDelete: func.isRequired,
  errors: object.isRequired
};

export default EventForm;