import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import getDates from './hooks/getDates.js';
import getDisplayDate from './hooks/getDisplayDate.js';
import { useImmer } from 'use-immer';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function FormDay({
  currentDestination,
  formName,
  buttonName,
  handleNewDay,
  initialValues,
}) {
  const { date } = useParams();
  const startDate = new Date(currentDestination[0].startDate);
  const endDate = new Date(currentDestination[0].endDate);
  const dates = getDates(startDate, endDate);
  const [formLocations, updateFormLocations] = useImmer(
    currentDestination[0].locations.map(loc => ({
      location: loc.place,
      coordinates: loc.coordinates,
      isChecked: false,
    }))
  );
  const plannedDays = currentDestination[0].routes.map(day =>
    new Date(day.date).getTime()
  );
  const filteredDates = dates.filter(
    day => !plannedDays.includes(day.getTime())
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      date: initialValues === undefined ? '' : initialValues.date,
    },
  });

  useEffect(() => {
    updateFormLocations(draft => {
      const currentLocation = draft.find(location =>
        initialValues?.locations.map(
          name => name.location === location.location
        )
      );
      if (currentLocation) {
        currentLocation.isChecked = !currentLocation.isChecked;
      }
    });
  }, [initialValues, updateFormLocations]);
  function handleToggle(e) {
    updateFormLocations(draft => {
      const currentLocation = draft.find(
        locat => locat.location === e.target.value
      );
      currentLocation.isChecked = !currentLocation.isChecked;
    });
  }

  const onSubmit = data => {
    handleNewDay(data, formLocations);
  };
  return (
    <>
      <FormContainer
        aria-label={formName}
        id="newDayForm"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          {initialValues === undefined ? (
            <>
              <LabelHeader htmlFor="select date">Date</LabelHeader>
              <StyledSelect
                name="date"
                id="select date"
                autoFocus
                {...register('date', { required: 'Please select a date' })}
              >
                <option value={''}>--Select a date--</option>
                {filteredDates.map((date, index) => (
                  <option key={index} value={date}>
                    {getDisplayDate(date)}
                  </option>
                ))}
              </StyledSelect>
            </>
          ) : (
            <>
              <LabelHeader htmlFor="date">Date</LabelHeader>
              <InputField id={'date'} disabled value={date}></InputField>
            </>
          )}
          {errors?.date && <ErrorMessage>{errors?.date.message}</ErrorMessage>}
        </div>
        <div>
          <Subheader>Choose locations for the day</Subheader>
          {formLocations?.map((loc, index) => (
            <LocationButton
              key={index}
              type="button"
              value={loc.location}
              onClick={e => handleToggle(e)}
              className={loc.isChecked ? 'checked' : ''}
            >
              {loc.location}
            </LocationButton>
          ))}
        </div>
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

const Subheader = styled.h3`
  width: 100%;
  margin-bottom: 0;
  margin-top: 0;
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
  height: 2rem;
  max-width: 400px;
  &:active {
    transform: scale(0.9);
    filter: brightness(90%);
  }
  &.checked {
    background-color: var(--bg-color-action);
  }
`;

const InputField = styled.input`
  padding: 6px 12px;
  margin-top: 10px;
  border-radius: 14px;
  border: none;
  background-color: var(--bg-color-content);
  width: 100%;
  max-width: 400px;
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
