// export const usePromiseModal = ({
//   type = 'confirm',
//   title,
//   description,
//   customModal,
// }: usePromistModalParams) => {
//   const { addModal, removeModal } = useContext<ModalProps>(ModalContext);
//   const resolveRef = useRef(() => {});
//   // const resolveRef = useRef<(value?: unknown) => void>(() => {});

//   const id = useMemo(nanoid, []);

//   const showModal = () => {
//     // showModal을 할 때에 Promise를 만들어서, resolve되기 전까지는 다른 작업들이 멈춰있도록 한다.
//     return new Promise((resolve) => {
//       // hideModal을 할 때에는 resolve를 해야하기 때문에 resolve를 ref에 담아둔다.
//       resolveRef.current = resolve;

//       if (type !== 'custom') {
//         addModal({
//           id,
//           type,
//           title,
//           description,
//           onClose: hideModal,
//           onSuccess:() => resolve(true)
//         });
//       }

//       if (type === 'custom' && customModal) {
//         addModal({
//           id,
//           type,
//           customModal: customModal || <></>,
//         });
//       }
//     });
//   };

//   const hideModal = () => {
//     // 만약 hideModal을 누르면 바로 resolve되어 일시정지된 작업을 다시 시작한다.
//     // 나는 false를 뱉으면서 promise가 resolve되도록 만들었다.
//     resolveRef.current(false);
//     removeModal();
//   };

//   return { showModal, hideModal };
// };
