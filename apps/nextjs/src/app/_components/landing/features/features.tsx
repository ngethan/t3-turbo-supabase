import Link from "next/link";

import { buttonVariants } from "@acme/ui/button";
import { Card, CardHeader } from "@acme/ui/card";

import MotionWrap from "../../motion-wrap";

export default function Features() {
  return (
    <MotionWrap className="w-full py-24 lg:py-32" id="features">
      <div className="container space-y-12 px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-foreground/10">
              Key Features
            </div>
            <h2 className="text-3xl font-bold tracking-tighter text-gray-900 dark:text-gray-50 sm:text-5xl">
              Essential tools for effortless note sharing
            </h2>
            <p className="max-w-[900px] text-gray-600 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Posts Buddy provides all the features you need to upload,
              organize, and share your class notes seamlessly.
            </p>
          </div>
        </div>
        <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
          <Card className="grid gap-1">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Instant Uploads
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Quickly upload your notes to the cloud with just a few clicks.
              </p>
            </CardHeader>
          </Card>
          <Card className="grid gap-1">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Cross-Device Sync
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access and sync your notes seamlessly across all your devices.
              </p>
            </CardHeader>
          </Card>
          <Card className="grid gap-1">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Secure Sharing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Share your notes securely with classmates and friends.
              </p>
            </CardHeader>
          </Card>
          <Card className="grid gap-1">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Free Forever
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Enjoy all the features of Posts Buddy at no cost.
              </p>
            </CardHeader>
          </Card>
          <Card className="grid gap-1">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Offline Access
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Access your notes even without an internet connection.
              </p>
            </CardHeader>
          </Card>
          <Card className="grid gap-1">
            <CardHeader>
              <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">
                Organizational Tools
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Use tags and folders to keep your notes well-organized.
              </p>
            </CardHeader>
          </Card>
        </div>
        <div className="flex flex-row items-start justify-between gap-4 md:justify-center">
          <Link
            href="/auth/signin"
            // default todo update shadn
            className={buttonVariants({ variant: "default" })}
          >
            Get Started
          </Link>
          <Link
            className={buttonVariants({ variant: "outline" })}
            href="/about"
          >
            Learn More
          </Link>
        </div>
      </div>
    </MotionWrap>
  );
}
