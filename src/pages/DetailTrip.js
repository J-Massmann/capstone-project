import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import home from '../img/Home_Icon.svg';
import { useState } from 'react';
import { DeleteModal } from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import Button from '../components/Button.js';
import Header from '../components/Header';
import EditIcon from '../components/Icons/EditIcon';

export default function DetailTrip({
  onGetCurrentDestination,
  onDeleteDestination,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const detailDestination = onGetCurrentDestination(id);
  const navigate = useNavigate();
  function handleDeleteDestination(id) {
    onDeleteDestination(id);
    navigate(-1);
  }
  function handleClick() {
    setIsOpen(!isOpen);
  }
  const startDate = new Date(detailDestination[0]?.startDate);
  const displayStartDate = getDisplayDate(startDate);

  const endDate = new Date(detailDestination[0]?.endDate);
  const displayEndDate = getDisplayDate(endDate);

  return (
    <>
      <Header handleClick={handleClick} iconGoBack={home}>
        Your Trip
      </Header>
      {detailDestination.map(trip => (
        <Wrapper key={trip.id}>
          <SubHeaderWrapper>
            <Subheader>{trip.place}</Subheader>
            <EditIcon link={`/edit/${trip.place}`} />
          </SubHeaderWrapper>
          <Subheader2>Date:</Subheader2>
          <p>
            {displayStartDate} - {displayEndDate}
          </p>
          <Subheader2>Locations:</Subheader2>
          <ul>
            {trip.locations.map(location => (
              <li key={location.place}>{location.place}</li>
            ))}
          </ul>
        </Wrapper>
      ))}
      <Button link={`/details/${id}/dayplaner`}>Plan your days</Button>
      <DeleteModal
        open={isOpen}
        setOpen={setIsOpen}
        handleDelete={() => handleDeleteDestination(detailDestination[0].id)}
      >
        Are you sure that you want to delete the trip?
      </DeleteModal>
    </>
  );
}

const Wrapper = styled.section`
  display: block;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 550px) {
    width: 535px;
  }
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

const Subheader = styled.h2`
  margin-bottom: 0;
  font-size: 2em;
  font-weight: bold;
  background-size: cover;
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
  @media (max-width: 230px) {
    text-align: end;
  }
`;

const Subheader2 = styled.h3`
  margin-bottom: 10px;
  margin-top: 10px;
  text-decoration: underline;
`;
