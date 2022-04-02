import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import success from '../img/success.svg';

export default function Button({ link, children }) {
  return (
    <ButtonWrapper>
      <LinkDayPlaner to={link}>{children}</LinkDayPlaner>
    </ButtonWrapper>
  );
}

export function SubmitButton({ children, condition }) {
  const [isSuccessfull, setisSuccessfull] = useState(false);
  return (
    <SubmitButtonWrapper
      className={isSuccessfull ? 'is_active' : ''}
      onClick={() => setisSuccessfull(!isSuccessfull)}
      disabled={condition}
    >
      <Span className={isSuccessfull ? 'is_active' : ''}>{children}</Span>
      <ImgWrapper className={isSuccessfull ? 'is_active' : ''}>
        <SuccessImg
          width={40}
          height={40}
          src={success}
          alt="success"
          className={isSuccessfull ? 'is_active' : ''}
        />
      </ImgWrapper>
    </SubmitButtonWrapper>
  );
}

const ButtonWrapper = styled.button`
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

const SubmitButtonWrapper = styled.button`
  position: relative;
  margin-top: 2rem;
  width: 50%;
  max-width: 250px;
  height: 2.5rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
  transition: all 0.5s;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
  &.is_active {
    width: 40px;
    height: 40px;
    background: transparent;
  }
`;

const Span = styled.span`
  transition: all 0.5s;
  &.is_active {
    display: none;
  }
`;

const ImgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  z-index: 2;
  visibility: hidden;
  transition: all 0.5s;
  &.is_active {
    visibility: visible;
  }
`;

const SuccessImg = styled.img`
  visibility: hidden;
  &.is_active {
    visibility: visible;
    z-index: 3;
    margin-top: 50%;
    transform: translateY(-50%) rotate(0deg) scale(0);
    transform: translateY(-50%) rotate(720deg) scale(1);
    width: 40px;
    height: 40px;
    transform-origin: 50% 50%;
    transition: all 0.5s;
  }
`;
