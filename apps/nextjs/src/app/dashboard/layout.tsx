import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { createSupabaseServerClient } from "@/utils/supabase/server";
import { Layout } from "./_components/layout";

export const metadata: Metadata = {
  title: {
    default: "Dashboard - Posts Buddy",
    template: `%s - Dashboard - Posts Buddy`,
  },
  description: "Posts Buddy: A powerful notes sharing website.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createSupabaseServerClient();
  const user = await supabase.auth.getUser();

  const layout = cookies().get("react-resizable-panels:layout");
  const collapsed = cookies().get("react-resizable-panels:collapsed");

  const defaultLayout = layout
    ? (JSON.parse(layout.value) as number[])
    : undefined;
  const defaultCollapsed = collapsed
    ? (JSON.parse(collapsed.value) as boolean)
    : false;

  if (user.error ?? !user.data.user) redirect("/auth/signin");

  return (
    <Layout
      defaultLayout={defaultLayout}
      defaultCollapsed={defaultCollapsed}
      navCollapsedSize={4}
      user={user}
    >
      {children}
    </Layout>
  );
}
