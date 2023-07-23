import React from 'react';
import ModalPortal from './ModalPortal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAlarm } from '../../../redux/modules/confirm';
import { styled } from 'styled-components';
import { CiCircleAlert } from 'react-icons/ci';
import { CiCircleQuestion } from 'react-icons/ci';
import './alarm.css';

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
      <StWrapper>
        {alarmType === 'alert' ? <CiCircleAlert className="icon" /> : <CiCircleQuestion className="icon" />}
        {message.includes('.') ? (
          <div>
            <p>{message.split('.')[0]}</p>
            <br />
            <p>{message.split('.')[1]}</p>
          </div>
        ) : (
          <p>{message}</p>
        )}
        {alarmType === 'alert' && <button onClick={onClickAlertHandler}>닫기</button>}
        {alarmType === 'confirm' && (
          <StButtons>
            <button onClick={buttonActions.ok.click}>확인</button>
            <button onClick={buttonActions.cancel.click}>취소</button>
          </StButtons>
        )}
      </StWrapper>
    </ModalPortal>
  ) : null;
};

export default AlarmContainer;

const StWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  & p {
    font-size: 20px;
    text-align: center;
  }
`;

const StButtons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
