import Timer from "./Timer";
import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"
import useTask from "@/hooks/useTask";
import moment from "moment";

interface MainTaskTimerProps {
  activeTaskId?: number | null;
  timerStarted?: string | null;
}

const MainTaskTimer = ({ activeTaskId = null, timerStarted = null }: MainTaskTimerProps) => {
  const {task: activeTask, isLoading, handleTaskStop, handleTaskStart } = useTask({ 
    taskId: activeTaskId 
  });

  return (
    <Card>
      <CardContent>
        {
          isLoading ? (
            <>
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2 mt-2" />
            </>
          ) : (
            <div className="text-sm text-gray-600">
              {activeTask ? (
                <>
                  <span className="font-medium">{activeTask.title}</span>
                  <Timer
                  {...{
                    activeTask,
                    totalTimeElapsed: activeTask?.actual_duration ?? 0,
                    estimatedDuration: activeTask?.estimated_duration ?? undefined,
                    onStop: handleTaskStop,
                    onStart: handleTaskStart
                  }} />
                </>
              ) : (
                'No Active Task'
              )}
              <br />
              Timer Started: <span className="font-medium">{timerStarted ? moment(timerStarted).format('MMM DD, YYYY HH:mm:ss') : 'None'}</span>
            </div>
          )}        
      </CardContent>
    </Card>
  )
}

export default MainTaskTimer