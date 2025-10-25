import { useEffect, useRef, useState } from "react";
import moment from "moment";
import { Button } from "./ui/button";
import { FaPlay, FaStop } from "react-icons/fa";
import clsx from "clsx";
import { Task } from "@/lib/supabase";

interface TimerProps {
  activeTask: Task;
  totalTimeElapsed?: number;
  onStart?: (startTime: moment.Moment) => void;
  onStop?: (startTime: moment.Moment, endTime: moment.Moment) => void;
  size?: 'small' | 'medium' | 'large';
  estimatedDuration?: number;
}

const Timer = ({ activeTask, onStart, onStop, size, estimatedDuration }: TimerProps) => {
  const [elapsedTime, setElapsedTime] = useState(activeTask?.actual_duration 
    ? activeTask.actual_duration * 60 * 1000 
    : 0
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const initialTimeRef = useRef<moment.Moment | null>(null);

  useEffect(() => {
    if (activeTask.is_timing) {
      initialTimeRef.current = moment();
      intervalRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 50);
      }, 50);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [activeTask.is_timing]);

  return (
        <div className="flex">
          <div className={clsx(
            "font-mono mr-4 justify-center items-center flex",
            size === 'small' ? 'text-sm' :
            size === 'large' ? 'text-2xl' :
            'text-lg'
          )}>
            {
              activeTask.is_timing
              ? moment.utc(elapsedTime).format('HH:mm:ss.SS')
              : moment.utc((activeTask.actual_duration ?? 0) * 60 * 1000).format('HH:mm:ss')
            }
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
              if (activeTask.is_timing) {
                onStop?.(initialTimeRef.current ?? moment(), moment());
            } else {
              onStart?.(moment());
            }
          }}>
            {activeTask.is_timing
            ? <FaStop  className="text-red-500"/>
            : <FaPlay className="text-green-500" />
            }
          </Button>
        </div>
  )
}


export default Timer;