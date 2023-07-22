import React, { useEffect } from 'react';
import ModalPortal from './ModalPortal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlarm, openAlarm } from '../../../redux/modules/confirm';

const AlarmContainer = () => {
  const { message, isOpenAlarm, buttonActions, alarmType } = useSelector(state => state.confirm);
  // 여기는 isOpenModal상태를 가져오는
  const dispatch = useDispatch();

  function closeModal() {
    // 여기는 isOpenAlarm 상태를 false로 바꾸는 dispatch가 와야함
    dispatch(closeAlarm());
    return false;
  }
  const onClickAlertHandler = () => {
    closeModal();
  };

  return isOpenAlarm ? (
    <ModalPortal>
      <div>
        <p>{message}</p>
        {alarmType === 'alert' && <button onClick={onClickAlertHandler}>닫기</button>}
        {alarmType === 'confirm' && (
          <>
            <button onClick={buttonActions.ok.click}>확인</button>
            <button onClick={buttonActions.cancel.click}>취소</button>
          </>
        )}
      </div>
    </ModalPortal>
  ) : null;
};

export default AlarmContainer;
