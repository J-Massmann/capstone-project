import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import x_icon from '../img/icon_x.svg';
import Form from '../components/Form.js';
import Modal from '../components/Modal.js';

export default function EditTrips({ destinations, onEditDestination }) {
  const { id } = useParams();
  const detailDestination = destinations.filter(destination => {
    return destination.place === id;
  });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  function showSubmitMessage() {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate(-1);
    }, 2500);
  }

  const initialValues = {
    startDate: new Date(detailDestination[0].startDate),
    endDate: new Date(detailDestination[0].endDate),
    focusedInput: null,
  };

  const defaultValues = {
    destination: detailDestination[0].place,
    locations: '',
  };

  const onSubmit = (destinationMapbox, stateDate, locations) => {
    const finalData = {
      id: detailDestination[0].id,
      place: destinationMapbox,
      startDate: stateDate.startDate,
      endDate: stateDate.endDate,
      locations: locations,
    };
    onEditDestination(finalData);
    showSubmitMessage();
  };

  return (
    <>
      {detailDestination.map(trip => (
        <div key={trip.id}>
          <HeaderWrapper>
            <Button onClick={() => navigate(-1)}>
              <img src={x_icon} alt="cancel" />
            </Button>
            <h1> {trip.place}</h1>
          </HeaderWrapper>
          <Form
            formName={'Edit a trip'}
            buttonName={'Save'}
            destination={trip}
            initialState={initialValues}
            preloadedValues={defaultValues}
            initialCount={40 - trip.place.length}
            onCreateTrips={onSubmit}
          />
        </div>
      ))}
      <Modal open={isOpen}>
        Your changes for your trip to {id} have been saved
      </Modal>
    </>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  h1 {
    width: 100%;
    text-align: center;
    @media (max-width: 230px) {
      text-align: end;
    }
  }
`;

const Button = styled.button`
  position: absolute;
  width: fit-content;
  height: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;
