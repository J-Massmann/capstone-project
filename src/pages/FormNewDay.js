import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import x_icon from '../img/icon_x.svg';
import FormDay from '../components/FormDay.js';
import Modal from '../components/Modal.js';

export default function FormNewDay({
  onEditDestination,
  onGetCurrentDestination,
}) {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [currentDestination, setCurrentDestination] = useState(
    onGetCurrentDestination(id)
  );

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
        .map(location => location.location),
    };
    onEditDestination(currentDestination[0], routes);
    showSubmitMessage();
  };

  return (
    <>
      <HeaderWrapper>
        <img src={x_icon} alt="cancel" onClick={() => navigate(-1)} />
        <h1>Plan a day</h1>
      </HeaderWrapper>
      <FormDay
        currentDestination={currentDestination}
        formName={'Plan a day'}
        buttonName={'Create'}
        setNewDay={onSubmit}
      />
      <Modal open={isOpen}>The plan has been saved!</Modal>
    </>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  & h1 {
    width: 100%;
    text-align: center;
    @media (max-width: 230px) {
      text-align: end;
    }
  }
  img {
    @media (min-width: 200px) {
      position: absolute;
    }
    cursor: pointer;
  }
`;
