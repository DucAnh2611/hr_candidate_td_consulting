import { useEffect, useState } from "react";
import useSimpleStateManagement from "./useSimpleStateManagement";
import { supabase } from "../api";
import { ESimpleStateManagementContextDispatchType } from "../enums/context";
import type { Session } from "@supabase/supabase-js";

export function useAuth() {
  const { state, dispatch } = useSimpleStateManagement();
  const [loading, setLoading] = useState(true);

  const setSession = (session: Session | null) => {
    if (!dispatch || !session) return;

    dispatch({
      type: ESimpleStateManagementContextDispatchType.UPDATE,
      data: {
        session,
      },
    });
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { user: state.session?.user ?? null, session: state.session, loading };
}