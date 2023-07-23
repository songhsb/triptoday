import { atom } from 'recoil';

export const SearchAtom = atom({
  key: 'SearchAtom',
  default: [],
});

export const EmailAtom = atom({
  key: 'EmailAtom',
  default: [],
});

export const confirmReply = atom({
  key: 'confirmReply',
  defalut: false,
});
