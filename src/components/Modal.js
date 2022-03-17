import styled from 'styled-components';

export default function Modal({ open, children }) {
  if (!open) return null;
  return (
    <ModalWrapper aria-modal="true" aria-label="New Trip has been saved">
      {children}
    </ModalWrapper>
  );
}

export function DeleteModal({ open, setOpen, handleDelete, children }) {
  if (!open) return null;
  return (
    <ModalWrapper aria-modal="true" aria-label="delete">
      {children}
      <ButtonWrapper>
        <Button onClick={handleDelete} aria-label="yes">
          yes
        </Button>
        <Button onClick={() => setOpen(false)} aria-label="no">
          no
        </Button>
      </ButtonWrapper>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  max-width: 300px;
  transform: translate(-50%, -50%);
  background-color: var(--bg-color-content);
  padding: 1.5rem;
  z-index: 50;
  border: 3px solid var(--bg-color-action);
  border-radius: 10px;
  box-shadow: 0 0 1em var(--bg-color-main);
  color: var(--bg-color-main);
`;
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Button = styled.button`
  width: 40%;
  max-width: 100px;
  padding: 5px;
  border-radius: 10px;
  background-color: ${props =>
    props['aria-label'] === 'yes' ? 'green' : 'red'};
`;
