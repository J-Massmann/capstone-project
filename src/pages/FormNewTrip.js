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
      <HeaderWrapper>
        <img src={x_icon} alt="cancel" onClick={() => navigate(-1)} />
        <Header>New Trip</Header>
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

const Header = styled.h1`
  background: linear-gradient(
        -225deg,
        transparent 8px,
        var(--bg-color-action) 0
      )
      bottom left,
    linear-gradient(-45deg, transparent 8px, var(--bg-color-action) 0) bottom
      right;
  box-shadow: 0px 25px 10px -15px rgba(0, 0, 0, 0.25);
  background-size: 51% 20px;
  background-repeat: no-repeat;
  text-align: center;
  width: 50%;
  @media (max-width: 230px) {
    text-align: end;
  }
`;

const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  img {
    @media (min-width: 200px) {
      position: absolute;
      left: 5px;
    }
    cursor: pointer;
  }
`;
