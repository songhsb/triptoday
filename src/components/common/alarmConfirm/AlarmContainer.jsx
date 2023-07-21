import React from 'react';
import ModalPortal from './ModalPortal';
import ConfirmAlarm from './ConfirmAlarm';
import { useDispatch, useSelector } from 'react-redux';

const AlarmContainer = () => {
  const confirmMsg = useSelector(state => state.confirm.content);
  const confirmDisplay = useSelector(state => state.confirm.display);
  const next = useSelector(state => state.confirm.next);
  const dispatch = useDispatch();

  function closeModal() {
    dispatch(('', false));
  }
  // return confirmDisplay ? (
  return false ? (
    <ModalPortal>
      <ConfirmAlarm></ConfirmAlarm>
    </ModalPortal>
  ) : null;
};

export default AlarmContainer;
