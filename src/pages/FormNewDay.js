import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import x_icon from '../img/icon_x.svg';
import FormDay from '../components/FormDay.js';
import Modal from '../components/Modal.js';

export default function FormNewDay({ onAddRoute, onGetCurrentDestination }) {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const currentDestination = onGetCurrentDestination(id);

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
    onAddRoute(currentDestination[0], routes);
    showSubmitMessage();
  };

  return (
    <>
      <HeaderWrapper>
        <Cancel src={x_icon} alt="cancel" onClick={() => navigate(-1)} />
        <Header>Plan a day</Header>
      </HeaderWrapper>
      <FormDay
        currentDestination={currentDestination}
        formName={'Plan a day'}
        buttonName={'Create'}
        handleNewDay={onSubmit}
      />
      <Modal open={isOpen}>The plan has been saved!</Modal>
    </>
  );
}

const HeaderWrapper = styled.header`
  width: 100%;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  img {
    @media (min-width: 200px) {
      position: absolute;
    }
    cursor: pointer;
  }
`;

const Header = styled.h1`
  background-size: cover;
  background: linear-gradient(
        -225deg,
        transparent 8px,
        var(--bg-color-action) 0
      )
      bottom left,
    linear-gradient(-45deg, transparent 8px, var(--bg-color-action) 0) bottom
      right;
  box-shadow: 0 25px 10px -15px rgba(0, 0, 0, 0.25);
  background-size: 51% 20px;
  background-repeat: no-repeat;
  width: 60%;
  text-align: center;
  @media (max-width: 230px) {
    text-align: end;
  }
`;

const Cancel = styled.img`
  @media (min-width: 200px) {
    position: absolute;
  }
  cursor: pointer;
  left: 5px;
`;
