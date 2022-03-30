import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import edit from '../img/Edit_Icon.svg';
import deleteIcon from '../img/Delete_Icon.svg';
import goback from '../img/go-back.svg';
import { DeleteModal } from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import { useState } from 'react';

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
        <Button goback onClick={() => navigate(-1)}>
          <img src={goback} alt="go back in to DetailPage" />
        </Button>
        <h1>Route {daydate}</h1>
        <Button onClick={() => setIsOpen(true)}>
          <img src={deleteIcon} alt="delete_route" />
        </Button>
      </Heading>
      <Wrapper>
        <SubHeaderWrapper>
          <h2>
            Day {dayDiff + 1} - {date}
          </h2>
          <Button>
            <Link to={`/details/${id}/edit/day_${daydate}(${date})`}>
              <img src={edit} alt="edit_route" />
            </Link>
          </Button>
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
      <GoToMapButton>
        <LinkForm to={`/details/${id}/map/day_${daydate}(${date})`}>
          Show on map
        </LinkForm>
      </GoToMapButton>
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

const Button = styled.button`
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
    font-size: 1.5em;
    font-weight: bold;
  }
`;

const EditButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 15px;
  z-index: 2;
  background: transparent;
  border: transparent;
  width: fit-content;
`;

const Subheader2 = styled.h3`
  width: 100%;
  margin-bottom: 0;
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.5rem;
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
`;

const LinkForm = styled(Link)`
  width: 100%;
  display: block;
  text-decoration: none;
  color: var(--bg-color-main);
`;
