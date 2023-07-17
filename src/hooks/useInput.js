import { useState } from 'react';

const useInput = event => {
  const [value, setValue] = useState(event);

  const handler = e => {
    setValue(e.target.value);
  };
  return [value, handler];
};

export default useInput;
