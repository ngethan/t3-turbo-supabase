import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-gray-100 px-4 py-6 dark:bg-foreground/10 sm:flex-row md:px-6">
      <p className="text-xs text-gray-600 dark:text-gray-400">
        © 2024-future Posts Buddy. All rights reserved.
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          className="text-xs text-gray-600 underline-offset-4 hover:underline dark:text-gray-400"
          href="/legal/terms"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs text-gray-600 underline-offset-4 hover:underline dark:text-gray-400"
          href="/legal/privacy"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
