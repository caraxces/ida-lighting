declare module 'react-countup' {
  import { ComponentType } from 'react';
  
  interface CountUpProps {
    start?: number;
    end: number;
    duration?: number;
    decimals?: number;
    useEasing?: boolean;
    useGrouping?: boolean;
    separator?: string;
    decimal?: string;
    prefix?: string;
    suffix?: string;
    delay?: number;
    onEnd?: () => void;
    onStart?: () => void;
    redraw?: boolean;
  }
  
  const CountUp: ComponentType<CountUpProps>;
  export default CountUp;
} 