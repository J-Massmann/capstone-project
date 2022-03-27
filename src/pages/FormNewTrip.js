import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import x_icon from '../img/icon_x.svg';
import Modal from '../components/Modal.js';
import { useState } from 'react';
import Form from '../components/Form.js';
import { nanoid } from 'nanoid';

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
      place: destinationMapbox,
      startDate: stateDate.startDate,
      endDate: stateDate.endDate,
      locations: locations,
      routes: '',
    };
    onAddNewDestination(finalData);
    showSubmitMessage();
  };

  return (
    <>
      <HeaderWrapper>
        <img src={x_icon} alt="cancel" onClick={() => navigate(-1)} />
        <h1>New Trip</h1>
      </HeaderWrapper>
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

const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  & h1 {
    width: 100%;
    text-align: center;
    @media (max-width: 230px) {
      text-align: end;
    }
  }
  img {
    @media (min-width: 200px) {
      position: absolute;
    }
    cursor: pointer;
  }
`;
