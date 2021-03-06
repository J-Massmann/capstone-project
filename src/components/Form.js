import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useState, useEffect } from 'react';
import { DateRangeInput } from '@datepicker-react/styled';
import { useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './Form.css';
import mapboxgl from 'mapbox-gl';
import success from '../img/success.svg';

export default function Form({
  buttonName,
  formName,
  initialState,
  destination,
  onCreateTrips,
  preloadedValues,
}) {
  mapboxgl.accessToken = process.env.REACT_APP_ACCESSTOKEN;

  const [isSuccessfull, setisSuccessfull] = useState(false);
  const [locations, updateLocations] = useImmer(destination?.locations ?? []);
  const [destinationMapbox, setDestinationMapbox] = useState(
    preloadedValues?.destination === undefined
      ? ''
      : preloadedValues?.destination
  );
  const [locationMapbox, setLocationMapbox] = useState('');

  useEffect(() => {
    const geocoderDestination = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country, region, place',
      limit: 5,
      placeholder: 'e.g. Lissabon',
      minLength: 2,
    });
    geocoderDestination.on('result', e => {
      setDestinationMapbox({
        place: e.result.text,
        coordinates: [e.result.center[1], e.result.center[0]],
      });
    });
    geocoderDestination.addTo('#geocoderdestination');

    const geocoderLocations = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'region, place, poi',
      limit: 5,
      placeholder: 'Add a place you want to visit...',
      minLength: 2,
      clearOnBlur: true,
    });
    geocoderLocations.on('result', e => {
      setLocationMapbox({
        place: e.result.text,
        coordinates: [e.result.center[1], e.result.center[0]],
      });
    });

    geocoderLocations.addTo('#geocoderlocation');
  }, []);

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'all',
  });
  const [stateDate, dispatch] = useReducer(reducer, initialState);
  const [destinationError, setDestinationError] = useState(false);

  const onSubmit = () => {
    onCreateTrips(destinationMapbox, stateDate, locations);
  };

  function handleMapboxInput(e) {
    e.target.value === ''
      ? setDestinationError(true)
      : setDestinationError(false);
  }

  function handleAdd() {
    if (locationMapbox !== '') {
      updateLocations([...locations, locationMapbox]);
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
      inputLabelBorderRadius: '14px',
      inputBackground: 'transparent',
      inputBorderRadius: '14px',
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
        aria-label={formName}
        id="newTripForm"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Wrapper>
          <LabelHeader htmlFor="destinationresult">Destination:</LabelHeader>
          {preloadedValues?.destination === undefined ? (
            ''
          ) : (
            <InputField
              id="destinationresult"
              readOnly
              disabled
              value={preloadedValues?.destination}
            />
          )}

          <GeoCoderDestination
            display={
              preloadedValues?.destination === undefined ? 'displayed' : 'none'
            }
            id={'geocoderdestination'}
            onInput={e => handleMapboxInput(e)}
          ></GeoCoderDestination>
          {destinationError ? (
            <ErrorMessage>
              The name of your next destination must be filled!
            </ErrorMessage>
          ) : (
            ''
          )}
        </Wrapper>
        <Wrapper>
          <LabelHeader htmlFor="date">Date:</LabelHeader>
          {errors.DateRangeInput?.message ? (
            <ErrorMessage>{errors.DateRangeInput?.message}</ErrorMessage>
          ) : (
            ''
          )}
          <DateWrapper>
            <ThemeProvider theme={theme}>
              <DateRangeInput
                id="date"
                onDatesChange={data => {
                  dispatch({ type: 'dateChange', payload: data });
                }}
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
          </DateWrapper>
        </Wrapper>
        <Wrapper>
          <LabelHeader htmlFor="locations">Locations:</LabelHeader>
          <GeocoderLocations
            id="geocoderlocation"
            onKeyPress={e => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
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
                  <li key={index}>{location.place}</li>
                ))}
          </ListWrapper>
        </Wrapper>

        <CreateButton
          onClick={() => setisSuccessfull(true)}
          className={isSuccessfull ? 'is_active' : ''}
          disabled={
            destinationMapbox !== '' &&
            stateDate.startDate !== null &&
            stateDate.endDate !== null
              ? false
              : true
          }
          type="submit"
        >
          <Span className={isSuccessfull ? 'is_active' : ''}>{buttonName}</Span>
          <ImgWrapper className={isSuccessfull ? 'is_active' : ''}>
            <SuccessImg
              width={40}
              height={40}
              src={success}
              alt="success"
              className={isSuccessfull ? 'is_active' : ''}
            />
          </ImgWrapper>
        </CreateButton>
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

const GeoCoderDestination = styled.div`
  margin-top: 10px;
  display: ${props => (props.display === 'none' ? 'none' : '')};
`;

const DateWrapper = styled.div`
  margin-top: 10px;
  background-color: transparent;
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

const GeocoderLocations = styled.div`
  margin-top: 10px;
  border-radius: 14px;
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
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
`;

const CreateButton = styled.button`
  position: relative;
  margin-top: 2rem;
  width: 50%;
  max-width: 250px;
  height: 2.5rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
  box-shadow: 8px 8px 12px 0 rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
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
