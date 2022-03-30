import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import x_icon from '../img/icon_x.svg';
import FormDay from '../components/FormDay.js';
import Modal from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';

export default function EditDay({
  onEditDestination,
  onGetCurrentDestination,
}) {
  const { daydate } = useParams();
  const { id } = useParams();
  const { date } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const currentDestination = onGetCurrentDestination(id);
  const route = currentDestination[0].routes.find(route => {
    return getDisplayDate(route.date) === date;
  });

  function showSubmitMessage() {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate(-1);
    }, 2500);
  }

  const onSubmit = (data, formLocations) => {
    const routes = {
      date: data.date,
      locations: formLocations
        .filter(location => location.isChecked === true)
        .map(location => location),
    };
    onEditDestination(currentDestination[0], routes);
    showSubmitMessage();
  };

  return (
    <>
      <HeaderWrapper>
        <img src={x_icon} alt="cancel" onClick={() => navigate(-1)} />
        <Header>Route {daydate}</Header>
      </HeaderWrapper>
      <FormDay
        currentDestination={currentDestination}
        formName={'Edit a day'}
        buttonName={'Save'}
        handleNewDay={onSubmit}
        initialValues={route}
      />
      <Modal open={isOpen}>Your changes have been saved!</Modal>
    </>
  );
}

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
  @media (max-width: 230px) {
    text-align: end;
  }
`;
