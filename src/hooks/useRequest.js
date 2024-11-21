import noop from 'lodash/noop';
import { useState } from 'react';
import { captureException } from '../utils/logger';
import { ReactComponent as Spinner } from '../assets/icons/spinner.svg';

export default function useRequest(
  request,
  { onSuccess = noop, onError = noop, onSettle = noop } = {}
) {
  const [isLoading, setIsLoading] = useState();
  const mutate = (...args) => {
    setIsLoading(true);
    request(...args)
      .then(res => {
        onSuccess(res);
      })
      .catch(err => {
        onError(err);
        captureException(err);
      })
      .finally(res => {
        onSettle(res);
        setIsLoading(false);
      });
  };

  return { mutate, isLoading, Spinner };
}
