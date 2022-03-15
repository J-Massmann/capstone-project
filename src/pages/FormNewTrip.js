import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useImmer } from 'use-immer';
import x_icon from '../img/icon_x.svg';
import { nanoid } from 'nanoid';
import Modal from '../components/Modal.js';
import { useState } from 'react';

export default function FormNewTrip({ onAddNewDestination }) {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'all',
    defaultValues: {
      destination: '',
      isTripFuture: 'true',
      locations: '',
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const [locations, updateLocations] = useImmer([]);
  const onSubmit = data => {
    const handleData = {
      id: nanoid(),
      place: data.destination,
      isTripFuture: data.isTripFuture === 'true' ? true : false,
      locations: locations,
    };
    onAddNewDestination(handleData);
    reset();
    updateLocations([]);
    showSubmitMessage();
  };

  function handleAdd(e) {
    const currentLocation = document.getElementById('locations');
    setError('locations', {
      minLength: 1,
      message: 'You have to type in a location first',
    });
    if (currentLocation.value !== '') {
      updateLocations([...locations, currentLocation.value]);
      currentLocation.value = '';
    }
  }

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
      <FormContainer
        id="newTripForm"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelHeader htmlFor="destination">Destination:</LabelHeader>
        <InputField
          autoFocus
          id="destination"
          type="text"
          placeholder="e.g. Lissabon..."
          {...register('destination', {
            required: {
              value: true,
              message: 'The name of your next destination must be filled!',
            },
            minLength: 1,
            maxLength: {
              value: 40,
              message:
                'Name of the your Destination is too long, try keeping it a littler shorter',
            },
          })}
        />
        {errors.destination?.message ? (
          <ErrorMessage>{errors.destination?.message}</ErrorMessage>
        ) : (
          ''
        )}
        <LabelHeader htmlFor="status">Status:</LabelHeader>
        <SelectField id="status" {...register('isTripFuture')}>
          <option value={true}>Trip in the future</option>
          <option value={false}>Trip in the past</option>
        </SelectField>
        <LabelHeader htmlFor="locations">Locations:</LabelHeader>
        <InputField
          id="locations"
          type="text"
          placeholder="Add a place you want to vist..."
          {...register('locations')}
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

        <CreateButton type="submit">Create</CreateButton>
      </FormContainer>
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

const FormContainer = styled.form`
  display: grid;
  grid-template-rows: repeat(8, auto);
  gap: 10px;
`;

const LabelHeader = styled.label`
  text-decoration: underline;
  font-weight: bold;
  font-size: 1.5rem;
`;

const InputField = styled.input`
  margin-bottom: ${props => (props.id === 'locations' ? '5px' : '15px')};
  padding: 6px 12px;
  border-radius: 14px;
  border: none;
  background-color: var(--bg-color-content);
  width: 100%;
  max-width: 400px;
`;
const SelectField = styled.select`
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 14px;
  border: none;
  background-color: var(--bg-color-content);
  width: 100%;
  max-width: 400px;
`;

const ErrorMessage = styled.span`
  margin-top: ${props => (props.id === 'locationError' ? '-15px' : '-20px')};
  color: var(--bg-color-action);
  font-size: 0.8em;
`;

const Listheader = styled.h2`
  margin: 0;
  font-size: 1rem;
`;

const ListWrapper = styled.ul`
  margin: 0;
`;

const AddButton = styled.button`
  margin-top: -8px;
  width: fit-content;
  height: 2rem;
  padding: 7px;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
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
