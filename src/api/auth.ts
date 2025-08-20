import type { TAuthResponse } from "../types";
import { supabase } from "./supabase";

export async function signUp(
  email: string,
  password: string
): Promise<TAuthResponse> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return {
      data: null,
      error: error.message,
    };
  } else {
    return {
      data,
      error: null,
    };
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<TAuthResponse> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    return {
      data: null,
      error: error.message,
    };
  } else {
    return {
      data,
      error: null,
    };
  }
}

export async function signOut(): Promise<void> {
  await supabase.auth.signOut();
}
