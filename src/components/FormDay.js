import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import getDates from './hooks/getDates.js';
import getDisplayDate from './hooks/getDisplayDate.js';
import { useImmer } from 'use-immer';

export default function FormDay({
  currentDestination,
  formName,
  buttonName,
  setNewDay,
}) {
  const startDate = new Date(currentDestination[0].startDate);
  const endDate = new Date(currentDestination[0].endDate);
  const dates = getDates(startDate, endDate);
  const [formLocations, updateFormLocations] = useImmer(
    currentDestination[0].locations.map(loc => ({
      location: loc,
      isChecked: false,
    }))
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });

  function handleToggle(e) {
    updateFormLocations(draft => {
      const currentLocation = draft.find(
        locat => locat.location === e.target.value
      );
      currentLocation.isChecked = !currentLocation.isChecked;
    });
  }

  const onSubmit = data => {
    setNewDay(data, formLocations);
  };
  return (
    <>
      <FormContainer
        aria-label={formName}
        id="newDayForm"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Wrapper>
          <LabelHeader htmlFor="select date">Date</LabelHeader>
          <StyledSelect
            name="date"
            id="select date"
            autoFocus
            {...register('date', { required: 'Please select a date' })}
          >
            <option value={''}>--Select a date--</option>
            {dates.map((date, index) => (
              <option key={index} value={date}>
                {getDisplayDate(date)}
              </option>
            ))}
          </StyledSelect>
          {errors?.date && <ErrorMessage>{errors?.date.message}</ErrorMessage>}
        </Wrapper>
        <Wrapper>
          {formLocations?.map((loc, index) => (
            <LocationButton
              key={index}
              type="button"
              value={loc.location}
              onClick={e => handleToggle(e)}
              className={loc.isChecked ? 'active' : ''}
            >
              {loc.location}
            </LocationButton>
          ))}
        </Wrapper>
        <CreateButton>{buttonName}</CreateButton>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: grid;
  grid-template-rows: repeat(6, auto);
  gap: 25px;
  max-width: 400px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

const Wrapper = styled.div`
  max-width: 400px;
  position: relative;
`;

const StyledSelect = styled.select`
  padding: 6px 12px;
  margin-top: 10px;
  border-radius: 14px;
  border: none;
  background-color: var(--bg-color-content);
  width: 100%;
  max-width: 400px;
`;

const LabelHeader = styled.label`
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.5rem;
`;

const LocationButton = styled.button`
  padding: 6px 12px;
  margin-top: 10px;
  border-radius: 14px;
  border: none;
  background-color: var(--bg-color-content);
  width: 100%;
  height: 2.5em;
  max-width: 400px;
  &.active {
    background-color: var(--bg-color-action);
  }
`;

const CreateButton = styled.button`
  margin-top: 2rem;
  width: 50%;
  max-width: 250px;
  height: 2.5rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
`;

const ErrorMessage = styled.p`
  margin: 0;
  color: var(--bg-color-action);
  font-size: 0.8em;
`;
