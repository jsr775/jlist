import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./ui/card";
import moment from "moment";
import { Button } from "./ui/button";
import { FaPlay, FaStop } from "react-icons/fa";
import clsx from "clsx";
import { es } from "date-fns/locale";

interface TimerProps {
  totalTimeElapsed?: number;
  onStart?: (startTime: number) => void;
  onStop?: (endTime: number) => void;
  size?: 'small' | 'medium' | 'large';
  estimatedDuration?: number;
}


const Timer = ({ totalTimeElapsed, onStart, onStop, size, estimatedDuration }: TimerProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(totalTimeElapsed ?? 0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 50);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [isRunning]);

  return (
        <div className="flex">
          <div className={clsx(
            "font-mono mr-4 justify-center items-center flex",
            size === 'small' ? 'text-sm' :
            size === 'large' ? 'text-2xl' :
            'text-lg'
          )}>
            {moment.utc(elapsedTime).format('HH:mm:ss.SS')}
          </div>
          {
            estimatedDuration && (
              <div className={clsx(
                "font-mono mr-4 justify-center items-center flex",
                size === 'small' ? 'text-sm' :
                size === 'large' ? 'text-2xl' :
                'text-lg'
              )}>
                / {moment.utc(estimatedDuration).format('HH:mm:ss.SS')}
              </div>
            )
          }
         
          <Button
            variant='outline'
            onClick={() => {
              if (isRunning) {
                setIsRunning(false);
              onStop?.(elapsedTime);
            } else {
              setIsRunning(true);
              onStart?.(moment().valueOf());
            }
          }}>
            {isRunning
            ? <FaStop  className="text-red-500"/>
            : <FaPlay className="text-green-500" />
            }
          </Button>
        </div>
  )
}


export default Timer;