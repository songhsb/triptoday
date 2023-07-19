import { useState } from 'react';

const useInput = event => {
  const [value, setValue] = useState(event);

  const handler = e => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue('');
  };

  return [value, handler, reset];
};

export default useInput;
