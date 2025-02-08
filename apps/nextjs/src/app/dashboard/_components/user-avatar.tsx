import type { UserResponse } from "@supabase/supabase-js";
import * as React from "react";
import Link from "next/link";
import { CreditCardIcon, LogOutIcon, UserIcon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@acme/ui/avatar";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { signOut } from "@/app/auth/actions";

interface UserAvatarProps {
  user: UserResponse;
}

export default function UserAvatar({ user }: UserAvatarProps) {
  if (user.error ?? !user.data.user) return null;
  const session = user.data;

  function getInitials(name: string) {
    const names = name.split(" ");
    const initials = names.map((x) => x.charAt(0).toUpperCase());
    if (initials.length > 1) {
      return `${initials[0]}${initials[initials.length - 1]}`;
    } else {
      return initials[0];
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full"
        >
          <Avatar className="h-10 w-10">
            {/* @username > image */}
            <AvatarImage
              src={session.user.user_metadata.avatar_url ?? ""}
              alt="User Avatar"
            />
            {/* dynamic generation */}
            <AvatarFallback>
              {getInitials(
                (session.user.user_metadata.full_name as string | undefined) ??
                  "User",
              )}
            </AvatarFallback>
          </Avatar>
          <span className="sr-only">Profile options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" forceMount className="w-56 min-w-32">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.user.user_metadata.full_name ?? "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.user.email ?? "user@example.com"}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard/settings/profile"}>
              <UserIcon className="mr-2 h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href={"/dashboard/settings/billing"}>
              <CreditCardIcon className="mr-2 h-4 w-4" />
              Billing
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
