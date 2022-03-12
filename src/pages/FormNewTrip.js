import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { useImmer } from 'use-immer';

export default function FormNewTrip() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      destination: '',
      isTripFuture: 'true',
      locations: '',
    },
  });
  const onSubmit = data => {
    console.log(data);
    const handleData = {
      destination: data.destination,
      isTripFuture: data.isTripFuture === 'true' ? true : false,
      locations: [locations],
    };
    console.log(handleData);
  };

  const [locations, updateLocations] = useImmer([]);
  const [locationName, setLocationName] = useState('');

  function handleChange(event) {
    setLocationName(event.target.value);
    console.log(locationName);
  }
  function handleAdd() {
    updateLocations([...locations, locationName]);
    console.log(locations);
  }

  return (
    <FormContainer autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <LabelHeader htmlFor="destination">Destination</LabelHeader>
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
      <LabelHeader htmlFor="status">status</LabelHeader>
      <select id="status" {...register('isTripFuture')}>
        <option value={true}>Trip in the future</option>
        <option value={false}>Trip in the past</option>
      </select>
      <LabelHeader htmlFor="locations">locations</LabelHeader>
      <InputField
        id="locations"
        type="text"
        value={locationName}
        {...register('locations')}
        onChange={handleChange}
      />
      <button type="button" onClick={handleAdd}>
        Add
      </button>
      <ul>
        {locations.length < 1
          ? null
          : locations.map((location, index) => <li key={index}>{location}</li>)}
      </ul>

      <button type="submit">Create</button>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: grid;
  grid-template-rows: repeat(8, auto);
  gap: 5px;
`;

const LabelHeader = styled.label`
  text-decoration: underline;
  font-weight: bold;
`;

const InputField = styled.input`
  margin-bottom: 15px;
`;
