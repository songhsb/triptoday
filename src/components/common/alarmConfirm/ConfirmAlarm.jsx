import React from 'react';

const ConfirmAlarm = ({ msg, display, onClick, next }) => {
  return display ? (
    <div>
      <p>{msg}</p>
      <button>확인</button>
      <button>취소</button>
    </div>
  ) : null;
};

export default ConfirmAlarm;
