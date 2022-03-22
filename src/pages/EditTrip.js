import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import x_icon from '../img/icon_x.svg';
import FormEditTrip from '../components/FormEditTrip.js';
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
          <FormEditTrip
            onEditDestination={onEditDestination}
            destination={trip}
            onShowSubmitMessage={showSubmitMessage}
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
  width: fit-content;
  height: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;
