import { cn } from "@acme/ui";

import { BackButton } from "@/app/auth/_components/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  backButtonLabel: string;
  backButtonLinkLabel: string;
  backButtonHref: string;
  showCredentials?: boolean;
  className?: string;
}

export const CardWrapper = ({
  children,
  backButtonLabel,
  backButtonLinkLabel,
  backButtonHref,
  showCredentials,
  className,
}: CardWrapperProps) => {
  return (
    <div className={cn("grid gap-6", className)}>
      {showCredentials && (
        <>
          <div>{children}</div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
        </>
      )}

      <BackButton
        label={backButtonLabel}
        linkLabel={backButtonLinkLabel}
        href={backButtonHref}
      />
    </div>
  );
};
