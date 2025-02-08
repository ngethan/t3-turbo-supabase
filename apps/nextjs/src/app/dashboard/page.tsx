import { Suspense } from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@acme/ui/breadcrumb";
import { ScrollArea } from "@acme/ui/scroll-area";

import { api, HydrateClient } from "@/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";
import {
  CreatePostForm,
  PostCardSkeleton,
  PostList,
} from "./_components/posts";

export const runtime = "edge";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  void api.post.all.prefetch();

  return (
    <HydrateClient>
      <div className="flex-1 space-y-4 p-4 pt-2 md:p-6 md:pt-4 lg:p-8 lg:pt-6">
        <CreatePostForm />

        <ScrollArea className="h-[65dvh] w-full overflow-y-auto">
          <Suspense
            fallback={
              <div className="flex w-full flex-col gap-4">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
              </div>
            }
          >
            <PostList />
          </Suspense>
        </ScrollArea>
      </div>
    </HydrateClient>
  );
}
