import { useRef, useState, useEffect } from 'react';


const parseMs = (milliseconds: number) => {
  return {
    days: Math.floor(milliseconds / 86400000),
    hours: Math.floor(milliseconds / 3600000) % 24,
    minutes: Math.floor(milliseconds / 60000) % 60,
    seconds: Math.floor(milliseconds / 1000) % 60,
  };
};

/**
 * 倒计时
 */
const useCountDown = (endTimeStamp: number) => {
  const timer:any = useRef(0);
  const [state, setState] = useState(endTimeStamp);

  // 计算时间的差值
  const calcTimeDiff = () => {
    // 获取当前时间戳
    const currentTime = +new Date();
    // 计算当前时间和结束时间的差值
    const seconds = Math.floor((endTimeStamp || 0) - currentTime);

    // 如果是负数 就清空定时器
    if (seconds <= 0) {
      clearInterval(timer.current);
      return setState(0);
    }
    setState(seconds);
  };

  useEffect(() => {
    calcTimeDiff();

    timer.current = setInterval(() => {
      calcTimeDiff();
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  const { days, hours, minutes, seconds } = parseMs(state);

  return { days, hours, minutes, seconds };
};

export default useCountDown;