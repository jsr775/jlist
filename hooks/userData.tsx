import { supabase } from "@/lib/supabase";
import moment from "moment";
import { useEffect, useState } from "react";

export interface UserData {
  id: string;
  active_task: number | null;
  timer_started: string | null;  // timestamptz
}

const useUserData = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const setActiveTask = async (taskId: number | null) => {
    if (!userData) return;
    const timerStarted = taskId ? moment().toISOString() : null;
    const { error } = await supabase
      .from('user_data')
      .update({ active_task: taskId, timer_started: timerStarted })
      .eq('id', userData.id);

    if (error) {
      throw new Error(error.message);
    }

    setUserData({ ...userData, active_task: taskId, timer_started: timerStarted });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('user_data')
        .select('*')
        .single();

      if (error) {
        throw new Error(error.message);
      }

      setUserData(data);
    };

    fetchUserData();
  }, []);

  return { userData, setActiveTask };
}

export default useUserData