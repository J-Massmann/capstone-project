import styled from 'styled-components';
import './ToggleBar.css';

export default function ToggleBar() {
  return (
    <ToggleBarWrapper>
      <ButtonFuture className="active" type="button" name="future">
        future
      </ButtonFuture>
      <ButtonPast className="unactive" type="button" name="past">
        past
      </ButtonPast>
    </ToggleBarWrapper>
  );
}

const ToggleBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const ButtonFuture = styled.button`
  border-radius: 15px 0px 0px 15px;
  border: 1px solid var(--bg-color-main);
  width: 40%;
  height: 2.2rem;
`;

const ButtonPast = styled.button`
  border-radius: 0 15px 15px 0;
  border: 1px solid var(--bg-color-main);
  width: 40%;
  height: 2.2rem;
`;
