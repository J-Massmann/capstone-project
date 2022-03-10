import styled from 'styled-components';

export default function TripCard({ id, place }) {
  return (
    <Wrapper key={id}>
      <h2>{place}</h2>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  border: 1px solid #bfc2c8;
  padding: 0 5px;
`;

// const ToggleButtonWrapper = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: flex-end;
//   gap: 5px;
//   margin-bottom: 5px;

//   & p {
//     margin: 0;
//   }

//   button {
//     background-color: var(--bg-color-content);
//   }
// `;
