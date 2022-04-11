import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import x_icon from '../img/icon_x.svg';
import Modal from '../components/Modal.js';
import { useState } from 'react';
import Form from '../components/Form.js';
import { nanoid } from 'nanoid';
import { FormHeader } from '../components/Header';

export default function FormNewTrip({ onAddNewDestination }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function showSubmitMessage() {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate(-1);
    }, 2500);
  }

  const initialValues = {
    startDate: null,
    endDate: null,
    focusedInput: null,
  };

  const onSubmit = (destinationMapbox, stateDate, locations) => {
    const finalData = {
      id: nanoid(),
      place: destinationMapbox.place,
      startDate: stateDate.startDate,
      endDate: stateDate.endDate,
      coordinates: destinationMapbox.coordinates,
      locations: locations,
      routes: [],
    };
    onAddNewDestination(finalData);
    showSubmitMessage();
  };

  return (
    <>
      <FormHeader iconGoBack={x_icon}>New Trip</FormHeader>
      <Form
        formName={'Add a new Trip to your App'}
        buttonName={'Create'}
        initialState={initialValues}
        initialCount={40}
        onCreateTrips={onSubmit}
      />
      <Modal open={isOpen}>Your Trip has been saved!</Modal>
    </>
  );
}
