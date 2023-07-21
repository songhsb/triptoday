// import React from 'react';
// import ModalPortal from './ModalPortal';
// import ConfirmAlarm from './ConfirmAlarm';
// import { useDispatch, useSelector } from 'react-redux';

// const AlarmContainer = () => {
//   const confirmMsg = useSelector(state => state.confirm.content);
//   const confirmDisplay = useSelector(state => state.confirm.display);
//   const next = useSelector(state => state.confirm.next);
//   // 여기는 isOpenModal상태를 가져오는
//   const dispatch = useDispatch();

//   function closeModal() {
//     // 여기는 isOpenModal 상태를 false로 바꾸는 dispatch가 와야함
//   }
//   return isOpenModal ? (
//     <ModalPortal>
//       <ConfirmAlarm></ConfirmAlarm>
//     </ModalPortal>
//   ) : null;
// };

// export default AlarmContainer;
