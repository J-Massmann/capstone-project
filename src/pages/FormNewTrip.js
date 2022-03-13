import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import x_icon from '../img/icon_x.svg';

export default function FormNewTrip() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      destination: '',
      isTripFuture: 'true',
      locations: '',
    },
  });
  const onSubmit = data => {
    const handleData = {
      destination: data.destination,
      isTripFuture: data.isTripFuture === 'true' ? true : false,
      locations: [locations],
    };
    console.log(handleData);
    document.getElementById('destination').value = '';
    document.getElementById('status').value = true;
    updateLocations([]);
    console.log(handleData);
  };

  const [locations, updateLocations] = useImmer([]);
  const [locationName, setLocationName] = useState('');

  function handleChange(event) {
    setLocationName(event.target.value);
  }
  function handleAdd() {
    updateLocations([...locations, locationName]);
    setLocationName('');
  }

  return (
    <>
      <HeaderWrapper>
        <img src={x_icon} alt="cancel" />
        <h1>New Trip</h1>
      </HeaderWrapper>
      <FormContainer
        id="newTripForm"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <LabelHeader htmlFor="destination">Destination:</LabelHeader>
        <InputField
          id="destination"
          type="text"
          placeholder="e.g. Lissabon..."
          {...register('destination', {
            required: {
              value: true,
              message: 'The name of your next destination must be filled',
            },
            minLength: 2,
          })}
        />
        <LabelHeader htmlFor="status">Status:</LabelHeader>
        <SelectField id="status" {...register('isTripFuture')}>
          <option value={true}>Trip in the future</option>
          <option value={false}>Trip in the past</option>
        </SelectField>
        <LabelHeader htmlFor="locations">Locations:</LabelHeader>
        <InputField
          id="locations"
          type="text"
          value={locationName}
          {...register('locations')}
          onChange={handleChange}
        />
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
    </>
  );
}

const HeaderWrapper = styled.header`
  display: flex;
  margin-top: -15px;
  position: relative;
  align-items: center;
  & h1 {
    width: 100%;
    text-align: center;
  }
  img {
    position: absolute;
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
`;
const SelectField = styled.select`
  margin-bottom: 15px;
  padding: 8px;
  border-radius: 14px;
  border: none;
  background-color: var(--bg-color-content);
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
  height: 2rem;
  justify-self: center;
  background-color: var(--bg-color-action);
  border: none;
  border-radius: 10px;
`;
