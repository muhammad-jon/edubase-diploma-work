import { useEffect, useRef, useState } from 'react';

export const getFormattedTimeLeft = timeLeft => {
  const absoluteTime = Math.abs(timeLeft);

  const minutes = Math.floor(absoluteTime / 60);
  const seconds = absoluteTime - minutes * 60;
  return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const useCountdown = (total, ms = 1000) => {
  const [counter, setCountDown] = useState(total);
  const [startCountDown, setStartCountDown] = useState(true);
  const intervalId = useRef();
  const start = () => setStartCountDown(true);
  const pause = () => setStartCountDown(false);
  const reset = () => {
    clearInterval(intervalId.current);
    setStartCountDown(false);
    setCountDown(total);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      startCountDown && counter > 0 && setCountDown(counter => counter - 1);
    }, ms);
    // Clear interval when count to zero
    if (counter === 0) clearInterval(intervalId.current);
    // Clear interval when unmount
    return () => clearInterval(intervalId.current);
  }, [startCountDown, counter, ms]);

  return [getFormattedTimeLeft(counter), counter, start, pause, reset];
};
