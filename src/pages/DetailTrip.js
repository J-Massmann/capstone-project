import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import home from '../img/Home_Icon.svg';
import edit from '../img/Edit_Icon.svg';
import deleteIcon from '../img/Delete_Icon.svg';
import { useState } from 'react';
import { DeleteModal } from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import Button from '../components/Button.js';

export default function DetailTrip({
  onGetCurrentDestination,
  onDeleteDestination,
}) {
  const { id } = useParams();
  const detailDestination = onGetCurrentDestination(id);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  function handleDeleteDestination(id) {
    onDeleteDestination(id);
    navigate(-1);
  }
  const startDate = new Date(detailDestination[0]?.startDate);
  const displayStartDate = getDisplayDate(startDate);

  const endDate = new Date(detailDestination[0]?.endDate);
  const displayEndDate = getDisplayDate(endDate);

  return (
    <>
      <Heading>
        <IconButton>
          <img src={home} alt="go_back" onClick={() => navigate(-1)} />
        </IconButton>
        <MainHedaer>Your Trips</MainHedaer>
        <IconButton delete onClick={() => setIsOpen(true)}>
          <img src={deleteIcon} alt="delete_trip" />
        </IconButton>
      </Heading>
      {detailDestination.map(trip => (
        <Wrapper key={trip.id}>
          <SubHeaderWrapper>
            <Subheader>{trip.place}</Subheader>
            <IconButton>
              <Link to={`/edit/${trip.place}`}>
                <img src={edit} alt="edit_icon" />
              </Link>
            </IconButton>
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
const Heading = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
`;

const MainHedaer = styled.h1`
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
  width: 50%;
  text-align: center;
`;

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

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
  height: fit-content;
  @media (min-width: 266px) {
    position: absolute;
    right: ${props => (props.delete ? '' : '0')};
    left: ${props => (props.delete ? '0' : '')};
  }
`;
