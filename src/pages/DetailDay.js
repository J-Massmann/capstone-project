import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import edit from '../img/Edit_Icon.svg';
import deleteIcon from '../img/Delete_Icon.svg';
import goback from '../img/go-back.svg';
import { DeleteModal } from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import { useState } from 'react';
import Button from '../components/Button.js';

export default function DetailDay({ onGetCurrentDestination, onDeleteDay }) {
  const { daydate } = useParams();
  const { id } = useParams();
  const { date } = useParams();
  const navigate = useNavigate();
  const currentDestination = onGetCurrentDestination(id);
  const route = currentDestination[0].routes.find(route => {
    return getDisplayDate(route.date) === date;
  });
  const [isOpen, setIsOpen] = useState(false);
  const dayDiff =
    (new Date(route?.date) - new Date(currentDestination[0].startDate)) /
    86400000;

  function handleDeleteDay(id, route) {
    onDeleteDay(id, route);
    navigate(-1);
  }
  return (
    <>
      <Heading>
        <IconButton goback onClick={() => navigate(-1)}>
          <img src={goback} alt="go back in to DetailPage" />
        </IconButton>
        <Header>Route {daydate}</Header>
        <IconButton onClick={() => setIsOpen(true)}>
          <img src={deleteIcon} alt="delete_route" />
        </IconButton>
      </Heading>
      <Wrapper>
        <SubHeaderWrapper>
          <h2>
            Day {dayDiff + 1} - {date}
          </h2>
          <IconButton>
            <Link to={`/details/${id}/edit/day_${daydate}(${date})`}>
              <img src={edit} alt="edit_route" />
            </Link>
          </IconButton>
        </SubHeaderWrapper>
        <Subheader2>Locations:</Subheader2>
        {route?.locations.length > 0 ? (
          route?.locations.map((location, index) => (
            <Location key={index}>{location.location}</Location>
          ))
        ) : (
          <p>You haven't added any locations to your Route</p>
        )}
      </Wrapper>
      <Button link={`/details/${id}/map/day_${daydate}(${date})`}>
        Show on map
      </Button>
      <DeleteModal
        open={isOpen}
        setOpen={setIsOpen}
        handleDelete={() => handleDeleteDay(currentDestination[0].id, route)}
      >
        Are you sure that you want to delete the trip?
      </DeleteModal>
    </>
  );
}

const Heading = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
  width: 50%;
  text-align: center;
`;

const IconButton = styled.button`
  width: fit-content;
  background: transparent;
  border: transparent;
  cursor: pointer;
`;

const Wrapper = styled.main`
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
  h2 {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1.4em;
    font-weight: bold;
  }
`;

const Subheader2 = styled.h3`
  width: 100%;
  margin-bottom: 0;
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.4rem;
`;

const Location = styled.p`
  padding: 6px 12px;
  margin-top: 10px;
  border-radius: 14px;
  background-color: var(--bg-color-content);
  color: var(--bg-color-main);
  width: 100%;
  height: 2rem;
  max-width: 400px;
  text-align: center;
  font-size: 13px;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
`;

const GoToMapButton = styled.button`
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

const LinkForm = styled(Link)`
  width: 100%;
  display: block;
  text-decoration: none;
  color: var(--bg-color-main);
`;
