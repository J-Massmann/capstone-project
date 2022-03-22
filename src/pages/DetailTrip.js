import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import home from '../img/Home_Icon.svg';
import edit from '../img/Edit_Icon.svg';
import deleteIcon from '../img/Delete_Icon.svg';
import { useState } from 'react';
import { DeleteModal } from '../components/Modal.js';

export default function DetailTrip({
  destinations,
  handleTripStatus,
  onDeleteDestination,
}) {
  const { id } = useParams();
  const detailDestination = destinations.filter(destination => {
    return destination.place === id;
  });
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  function handleDeleteDestination(id) {
    onDeleteDestination(id);
    navigate(-1);
  }
  const startDate = new Date(detailDestination[0].startDate);
  const startYYYY = startDate.getFullYear();
  let startMM = startDate.getMonth() + 1;
  let startDD = startDate.getDate();
  if (startDD < 10) startDD = '0' + startDD;
  if (startMM < 10) startMM = '0' + startMM;
  const displayStartDate = startDD + '.' + startMM + '.' + startYYYY;

  const endDate = new Date(detailDestination[0].endDate);
  const endYYYY = endDate.getFullYear();
  let endMM = endDate.getMonth() + 1;
  let endDD = endDate.getDate();
  if (endDD < 10) endDD = '0' + endDD;
  if (endMM < 10) endMM = '0' + endMM;
  const displayEndDate = endDD + '.' + endMM + '.' + endYYYY;

  return (
    <>
      <Heading>
        <Button delete onClick={() => setIsOpen(true)}>
          <img src={deleteIcon} alt="delete_trip" />
        </Button>
        <h1>Your Trips</h1>
        <Button>
          <img src={home} alt="go_back" onClick={() => navigate(-1)} />
        </Button>
      </Heading>
      {detailDestination.map(trip => (
        <Wrapper key={trip.id}>
          <SubHeaderWrapper>
            <h2>{trip.place}</h2>
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
            {trip.locations.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </Wrapper>
      ))}
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

const Wrapper = styled.section`
  display: block;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 550px) {
    width: 550px;
  }
`;

const SubHeaderWrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  h2 {
    width: 100%;
    margin-bottom: 0;
    font-size: 2em;
    font-weight: bold;
    @media (max-width: 230px) {
      text-align: end;
    }
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
  @media (min-width: 266px) {
    position: absolute;
    right: ${props => (props.delete ? '' : '0')};
    left: ${props => (props.delete ? '0' : '')};
  }
`;
