"use client";

import type { NavProps } from "@/app/dashboard/_components/layout/nav";
import type { UserResponse } from "@supabase/supabase-js";
import * as React from "react";
import Link from "next/link";
import {
  Flag,
  Home,
  NotebookTextIcon,
  PanelLeft,
  Search,
  Trash2,
} from "lucide-react";

import { cn } from "@acme/ui";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@acme/ui/breadcrumb";
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@acme/ui/resizable";
import { Separator } from "@acme/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@acme/ui/sheet";
import { ThemeToggle } from "@acme/ui/theme";
import { TooltipProvider } from "@acme/ui/tooltip";

import { Logo } from "@/app/dashboard/_components/layout/logo";
import { Nav } from "@/app/dashboard/_components/layout/nav";
import UserAvatar from "../user-avatar";

interface LayoutProps {
  children: React.ReactNode;
  user: UserResponse;
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

const NAV_LINKS: NavProps["links"] = [
  {
    title: "Home",
    label: "",
    href: "/dashboard",
    icon: Home,
    variant: "default",
  },
  {
    title: "Trash",
    label: "",
    href: "/dashboard",
    icon: Trash2,
    variant: "ghost",
  },
  {
    title: "Reported",
    label: "",
    href: "/dashboard",
    icon: Flag,
    variant: "ghost",
  },
];

export function Layout({
  children,
  user,
  defaultLayout = [265, 1095],
  defaultCollapsed = false,
  navCollapsedSize,
}: LayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout=${JSON.stringify(
            sizes,
          )}`;
        }}
        className="min-h-[100dvh] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(true)}`;
          }}
          onExpand={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(false)}`;
          }}
          className={cn(
            "hidden sm:block",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out",
          )}
        >
          <div
            className={cn(
              "flex h-[52px] items-center justify-center",
              isCollapsed ? "h-[52px]" : "px-2",
            )}
          >
            <Logo isCollapsed={isCollapsed} />
          </div>
          <Separator />
          <Nav isCollapsed={isCollapsed} links={NAV_LINKS} />
        </ResizablePanel>
        <ResizableHandle withHandle className="hidden sm:flex" />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <div className="flex h-full flex-col">
            <header
              className={cn(
                "sticky top-0 z-30 flex h-[52px] items-center gap-4 px-4 sm:static sm:border-0 sm:bg-transparent sm:px-6",
              )}
            >
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                {/* todo: make this and nav a combined list to loop through */}
                <SheetContent side="left" className="sm:max-w-xs">
                  <nav className="grid gap-1 text-lg font-medium">
                    <div className="my-2 flex items-center justify-between">
                      <Link
                        href="/dashboard"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                      >
                        <NotebookTextIcon className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Notes Buddy</span>
                      </Link>
                      <ThemeToggle />
                    </div>
                    <div className="-ml-2">
                      <Nav isCollapsed={false} links={NAV_LINKS} />
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
              <Breadcrumb className="hidden md:flex">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="#">Dashboard</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link href="#">Orders</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Recent Orders</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                />
              </div>

              <UserAvatar user={user} />
            </header>
            <Separator />
            {/* 54px is the height of the header */}
            <main className="max-h-[calc(100vh-54px)] flex-1 overflow-auto bg-muted/30">
              {children}
            </main>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
