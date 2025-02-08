import { ThemeToggle } from "@acme/ui/theme";

export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen items-center justify-center">
      {props.children}
      <div className="absolute bottom-4 right-4">
        <ThemeToggle />
      </div>
    </div>
  );
}
