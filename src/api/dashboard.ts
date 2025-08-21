import {
  SPB_BUCKET_STORAGE,
  SPB_EDGE_FUNC,
  SPB_REALTIME_CHANNELS,
  SPB_TABLES,
} from "../constants";
import type { TCandidate, TCandidateFormData } from "../types";
import { supabase } from "./supabase";
import { signOut } from "./auth";

export async function getCandidate({
  page,
  size,
}: {
  page: number;
  size: number;
}) {
  const from = (page - 1) * size;
  const to = from + size - 1;

  const { data, error, count } = await supabase
    .from(SPB_TABLES.candidate)
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  return {
    data: data as TCandidate[],
    error,
    count: count || 0,
  };
}

export function registerRealTimeCandidateChangesChannel(onChange: () => void) {
  return supabase
    .channel(SPB_REALTIME_CHANNELS.candidate)
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "candidates" },
      () => {
        onChange();
      }
    )
    .subscribe();
}

export async function createCandidate(candidateData: TCandidateFormData) {
  try {
    let { data: sessionData } = await supabase.auth.getSession();
    let token = sessionData.session?.access_token;

    if (!token) {
      const { data: refreshData, error: refreshError } =
        await supabase.auth.refreshSession();

      if (refreshError || !refreshData.session) {
        await signOut();
        alert("Session expired, please login again to save changes.");
        return null;
      }

      token = refreshData.session.access_token;
    }

    if (!candidateData.resume?.length) {
      return;
    }

    const resumePublicUrl = await uploadResume(candidateData.resume[0]);

    const body = {
      full_name: candidateData.full_name,
      applied_position: candidateData.applied_position,
      status: candidateData.status,
      resume_url: resumePublicUrl,
    };

    const { data, error } = await supabase.functions.invoke(
      SPB_EDGE_FUNC.createCandidate,
      { body }
    );

    return {
      data,
      error,
    };
  } catch (error) {
    return {
      data: null,
      error: "Error appeared!",
    };
  }
}

export async function uploadResume(file: File) {
  const filePath = `resumes/${file.name}`;

  const { error } = await supabase.storage
    .from(SPB_BUCKET_STORAGE.resume)
    .upload(filePath, file, { upsert: true });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from(SPB_BUCKET_STORAGE.resume).getPublicUrl(filePath);

  return publicUrl;
}
