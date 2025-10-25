import { supabase, Task } from "@/lib/supabase";
import _ from "lodash";
import { Moment } from "moment";
import { useEffect, useState } from "react";

interface UseTasksProps {
  taskId: number | null;
}

const useTask = ({ taskId }: UseTasksProps) => {
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTaskById = async (taskId: number) => {
    setIsLoading(true);
    
    try{
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (error) {
        throw new Error(error.message);
      }

    setTask(data);
  }  catch (error) {
    console.error('Error fetching task:', error);
  } finally {
    setIsLoading(false);
  }

  };


  const handleTaskStart = async () => {
    if (!task) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          is_timing: true
        })
        .eq('id', task.id)
        .select('*')
        .single();


      if (error) {
        throw new Error(error.message);
      }

      setTask(data);
    } catch (error) {
      console.error('Error starting task timer:', error);
    }
  }

  const handleTaskStop = async (startTime: Moment, endTime: Moment) => {
    if (!task) return;

    const actual_duration = _.sum([task.actual_duration || 0, endTime.diff(startTime, 'minutes')]);

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({
          actual_duration,
          is_timing: false
        })
        .eq('id', task.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setTask(data);
    } catch (error) {
      console.error('Error stopping task timer:', error);
    }
  }

  useEffect(() => {
    if (taskId !== null) {
      fetchTaskById(taskId)
    }
    
  },[taskId]);

  return { task, isLoading, fetchTaskById, handleTaskStop, handleTaskStart };
}

export default useTask;