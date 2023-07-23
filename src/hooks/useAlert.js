import { useDispatch } from 'react-redux';
import { openAlarm } from '../redux/modules/confirm';

const useAlert = () => {
  const dispatch = useDispatch();

  const customAlert = message => {
    const newAlert = {
      message,
      isOpenAlarm: true,
      alarmType: 'alert',
    };
    dispatch(openAlarm(newAlert));
  };
  return { customAlert };
};

export default useAlert;
