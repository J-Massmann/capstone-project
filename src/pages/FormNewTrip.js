import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import x_icon from '../img/icon_x.svg';
import Modal from '../components/Modal.js';
import { useState } from 'react';
import Form from '../components/Form.js';

export default function FormNewTrip({ onAddNewDestination }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  function showSubmitMessage() {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate(-1);
    }, 2000);
  }

  return (
    <>
      <HeaderWrapper>
        <img src={x_icon} alt="cancel" onClick={() => navigate(-1)} />
        <h1>New Trip</h1>
      </HeaderWrapper>
      <Form
        onAddNewDestination={onAddNewDestination}
        onShowSubmitMessage={showSubmitMessage}
      />
      <Modal open={isOpen}>Your Trip has been saved!</Modal>
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
