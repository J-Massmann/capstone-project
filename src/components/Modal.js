import styled from 'styled-components';

export default function Modal({ open, children }) {
  if (!open) return null;
  return (
    <ModalWrapper aria-modal="true" aria-label="New Trip has been saved">
      {children}
    </ModalWrapper>
  );
}

const ModalWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--bg-color-main);
  padding: 1.5rem;
  z-index: 50;
  border: 3px solid var(--bg-color-action);
  border-radius: 10px;
  box-shadow: 0 0 1em var(--bg-color-main);
`;
