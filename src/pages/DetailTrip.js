import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import home from '../img/Home_Icon.svg';
import edit from '../img/Edit_Icon.svg';
import deleteIcon from '../img/Delete_Icon.svg';
import { useState } from 'react';
import { DeleteModal } from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';

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
        <Button>
          <img src={home} alt="go_back" onClick={() => navigate(-1)} />
        </Button>
        <MainHedaer>Your Trips</MainHedaer>
        <Button delete onClick={() => setIsOpen(true)}>
          <img src={deleteIcon} alt="delete_trip" />
        </Button>
      </Heading>
      {detailDestination.map(trip => (
        <Wrapper key={trip.id}>
          <SubHeaderWrapper>
            <Subheader>{trip.place}</Subheader>
            <Button>
              <Link to={`/edit/${trip.place}`}>
                <img src={edit} alt="edit_icon" />
              </Link>
            </Button>
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
      <CreateButton>
        <LinkDayPlaner to={`/details/${id}/dayplaner`}>
          Plan your days
        </LinkDayPlaner>
      </CreateButton>
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
`;

const Wrapper = styled.section`
  display: block;
  width: 100%;
  margin-right: auto;
  margin-left: 1em;
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

const Button = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
  height: fit-content;
  box-shadow: 0px 25px 10px -15px rgba(0, 0, 0, 0.3);
  @media (min-width: 266px) {
    position: absolute;
    right: ${props => (props.delete ? '' : '0')};
    left: ${props => (props.delete ? '0' : '')};
  }
`;

const CreateButton = styled.button`
  width: 50%;
  max-width: 250px;
  height: 2.5rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
  position: fixed;
  bottom: 15px;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
  &:active {
    transform: scale(0.9);
    filter: brightness(90%);
  }
`;

const LinkDayPlaner = styled(Link)`
  width: 100%;
  display: block;
  text-decoration: none;
  color: var(--bg-color-main);
`;
