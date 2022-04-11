import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import x_icon from '../img/icon_x.svg';
import FormDay from '../components/FormDay.js';
import Modal from '../components/Modal.js';
import getDisplayDate from '../components/hooks/getDisplayDate.js';
import { FormHeader } from '../components/Header';

export default function EditDay({
  onEditDestination,
  onGetCurrentDestination,
}) {
  const { daydate } = useParams();
  const { id } = useParams();
  const { date } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const currentDestination = onGetCurrentDestination(id);
  const route = currentDestination[0].routes.find(route => {
    return getDisplayDate(route.date) === date;
  });

  function showSubmitMessage() {
    setIsOpen(true);
    setTimeout(() => {
      setIsOpen(false);
      navigate(-1);
    }, 2500);
  }

  const onSubmit = (data, formLocations) => {
    const routes = {
      date: data.date,
      locations: formLocations
        .filter(location => location.isChecked === true)
        .map(location => location),
    };
    onEditDestination(currentDestination[0], routes);
    showSubmitMessage();
  };

  return (
    <>
      <FormHeader iconGoBack={x_icon}>Route {daydate}</FormHeader>
      <FormDay
        currentDestination={currentDestination}
        formName={'Edit a day'}
        buttonName={'Save'}
        handleNewDay={onSubmit}
        initialValues={route}
      />
      <Modal open={isOpen}>Your changes have been saved!</Modal>
    </>
  );
}
