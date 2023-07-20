import { useState } from 'react';

const useInput = event => {
  const [value, setValue] = useState(event);

  const handler = e => {
    setValue(e.target.value);
  };

  const setter = e => {
    setValue(e);
  };

  return [value, handler, setter];
};

export default useInput;
