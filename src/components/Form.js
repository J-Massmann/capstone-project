import { useForm, Controller } from 'react-hook-form';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useState } from 'react';
import { DateRangeInput } from '@datepicker-react/styled';
import { useReducer } from 'react';
import { ThemeProvider } from 'styled-components';

export default function Form({
  initialState,
  initialCount,
  destination,
  submit,
  preloadedValues,
}) {
  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: preloadedValues
      ? preloadedValues
      : { destination: '', locations: '' },
  });

  const [stateDate, dispatch] = useReducer(reducer, initialState);
  const [counter, setCounter] = useState(initialCount);
  const [locations, updateLocations] = useImmer(
    destination?.locations ? destination.locations : []
  );
  const onSubmit = data => {
    submit(data, stateDate, locations);
  };

  function handleAdd(e) {
    e.preventDefault();
    const currentLocation = document.getElementById('locations');
    if (currentLocation.value !== '') {
      updateLocations([...locations, currentLocation.value]);
      currentLocation.value = '';
    } else {
      setError('locations', {
        minLength: 1,
        message: 'You have to type in a location first',
      });
    }
  }

  function reducer(stateDate, action) {
    switch (action.type) {
      case 'focusChange':
        return { ...stateDate, focusedInput: action.payload };
      case 'dateChange':
        return action.payload;
      default:
        throw new Error();
    }
  }

  const theme = {
    reactDatepicker: {
      colors: {
        accessibility: '#D80249',
        selectedDay: '#f7518b',
        selectedDayHover: '#F75D95',
        primaryColor: '#d8366f',
      },
      inputLabelBackground: '#bfc2c8',
      inputLabelBorderRadius: '15px',
      inputBackground: 'transparent',
      inputBorderRadius: '15px',
      inputPlaceholderColor: '#2A3036',
      inputMinHeight: '28',
      inputPadding: '0 8px 4px 32px',
      inputCalendarWrapperTop: '7px',
      inputCalendarIconColor: '#2A3036',
      inputFontWeight: '400',
      datepickerZIndex: '2',
    },
  };

  return (
    <>
      <FormContainer
        id="newTripForm"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Wrapper>
          <LabelHeader htmlFor="destination">Destination:</LabelHeader>
          <Counter name="counter of max characters for detination">
            {counter}
          </Counter>
          <InputField
            autoFocus
            id="destination"
            type="text"
            placeholder="e.g. Lissabon..."
            maxLength={40}
            {...register('destination', {
              onChange: e => {
                setCounter(40 - e.target.value.length);
              },
              required: {
                value: true,
                message: 'The name of your next destination must be filled!',
              },
              minLength: 1,
              maxLength: {
                value: 39,
                message:
                  'You reached the max amount of allowed characters, try to keep it a littler shorter',
              },
            })}
          />
          {errors.destination?.message ? (
            <ErrorMessage>{errors.destination?.message}</ErrorMessage>
          ) : (
            ''
          )}
        </Wrapper>
        <Wrapper>
          <LabelHeader htmlFor="date">Date:</LabelHeader>
          <DateWrapper>
            <Controller
              control={control}
              name="DateRangeInput"
              render={() => (
                <ThemeProvider theme={theme}>
                  <DateRangeInput
                    id="date"
                    onDatesChange={data =>
                      dispatch({ type: 'dateChange', payload: data })
                    }
                    onFocusChange={focusedInput =>
                      dispatch({ type: 'focusChange', payload: focusedInput })
                    }
                    startDate={stateDate.startDate}
                    endDate={stateDate.endDate}
                    focusedInput={stateDate.focusedInput}
                    numberOfMonths={3}
                    vertical={true}
                  />
                </ThemeProvider>
              )}
            />
          </DateWrapper>
        </Wrapper>
        <Wrapper>
          <LabelHeader htmlFor="locations">Locations:</LabelHeader>
          <InputField
            id="locations"
            type="text"
            maxLength={50}
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleAdd(e);
              }
            }}
            placeholder="Add a place you want to vist..."
            {...register('locations', {
              maxLength: {
                value: 49,
                message:
                  'You reached the max amount of allowed characters, try to keep it a littler shorter',
              },
            })}
          />
          <ErrorMessage id="locationError">
            {errors.locations?.message}
          </ErrorMessage>
          <AddButton type="button" onClick={handleAdd}>
            Add to list
          </AddButton>
          <Listheader>List of Locations:</Listheader>
          <ListWrapper>
            {locations.length < 1
              ? null
              : locations.map((location, index) => (
                  <li key={index}>{location}</li>
                ))}
          </ListWrapper>
        </Wrapper>

        <CreateButton type="submit">Create</CreateButton>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: grid;
  grid-template-rows: repeat(6, auto);
  gap: 25px;
`;

const Wrapper = styled.div`
  max-width: 400px;
  position: relative;
`;

const DateWrapper = styled.div`
  margin-top: 10px;
`;

const Counter = styled.span`
  position: absolute;
  right: 5px;
  top: 30px;
  width: 100%;
  max-width: 400px;
  text-align: end;
  font-size: 0.7em;
`;

const LabelHeader = styled.label`
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.5rem;
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

const ErrorMessage = styled.p`
  margin: 0;
  color: var(--bg-color-action);
  font-size: 0.8em;
`;

const Listheader = styled.h2`
  margin: 5px;
  font-size: 1rem;
`;

const ListWrapper = styled.ul`
  margin: 0;
`;

const AddButton = styled.button`
  width: fit-content;
  height: 2rem;
  padding: 7px;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
  margin-top: 10px;
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
