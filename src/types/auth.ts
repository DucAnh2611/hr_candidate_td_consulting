import type { Session, User } from "@supabase/supabase-js";

export type TAuthData = {
  user: User | null;
  session: Session | null;
};

export type TAuthResponse = {
  data: TAuthData | null;
  error: string | null;
};
