import { createSafeActionClient } from "next-safe-action";

import { createSupabaseServerClient } from "@/utils/supabase/server";

export const action = createSafeActionClient();

export const authAction = createSafeActionClient({
  async middleware() {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.getUser();

    if (error ?? !data.user) {
      throw new Error("Unauthorized");
    }

    return { user: data.user };
  },
});
