import { supabase, Task } from "@/lib/supabase";
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

  useEffect(() => {
    if (taskId !== null) {
      fetchTaskById(taskId)
    }
    
  },[taskId]);

  return { task, isLoading, fetchTaskById };
}

export default useTask;