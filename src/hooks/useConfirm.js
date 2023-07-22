// useConfirm.js
import { useDispatch } from 'react-redux';
import { closeAlarm, openConfirmAlarm } from '../redux/modules/confirm';

const useConfirm = () => {
  const dispatch = useDispatch();

  const confirm = message => {
    const promise = new Promise((resolve, reject) => {
      dispatch(
        openConfirmAlarm({
          message,
          isOpenAlarm: true,
          buttonActions: {
            ok: { click: () => resolve() },
            cancel: { click: () => reject() },
          },
          alarmType: 'confirm',
        }),
      );
    });
    return promise;
  };

  return { confirm };
};

export default useConfirm;
