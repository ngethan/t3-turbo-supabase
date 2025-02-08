"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { SignInSchema, SignUpSchema } from "@acme/validators";

import { DEFAULT_LOGIN_REDIRECT } from "@/config/routes";
import { action } from "@/lib/safe-action";
import { createSupabaseServerClient } from "@/utils/supabase/server";

export const signInWithPassword = action(
  SignInSchema,
  async ({ email, password }) => {
    const supabase = createSupabaseServerClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    revalidatePath("/", "layout");
    redirect(DEFAULT_LOGIN_REDIRECT);
  },
);

export const signUp = action(SignUpSchema, async ({ email, password }) => {
  const origin = headers().get("origin");
  const supabase = createSupabaseServerClient();

  const redirectUrl = `${origin}/auth/confirm?next=${encodeURIComponent(DEFAULT_LOGIN_REDIRECT)}`;

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectUrl,
    },
  });

  // User already exists, so fake data is returned. See https://supabase.com/docs/reference/javascript/auth-signup
  if (data.user?.identities && data.user.identities.length === 0) {
    throw new Error("An error occurred. Please try again.");
  }

  if (error) throw error;
  return data.user;
});

export const signOut = async () => {
  const supabase = createSupabaseServerClient();

  await supabase.auth.signOut();
  redirect("/");
};
