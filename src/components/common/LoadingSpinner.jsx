import React, { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';
import { styled } from 'styled-components';

function LoadingSpinner() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return loading ? (
    <StLoadingSpinner>
      <MoonLoader color={'#9ADCFF'} loading={loading} size={150} aria-label="Loading Spinner" data-testid="loader" />{' '}
    </StLoadingSpinner>
  ) : null;
}

export default LoadingSpinner;

const StLoadingSpinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;
