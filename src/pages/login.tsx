import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const errorMessages: { [key: string]: string } = {
  session_expired: "Your session has expired. Please log in again to continue.",
  signup_success: "Registration successful! Please log in to continue.",
  login_required: "Please log in to perform this action.",
};
export default function Login() {

  const [searchParams] = useSearchParams();
  const [authMessage, setAuthMessage] = useState<string | null>(null);

  useEffect(() => {
    const messageKey = searchParams.get("message");
    if (messageKey && errorMessages[messageKey]) {
      setAuthMessage(errorMessages[messageKey]);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">

      <Link to="/" className="absolute top-6 left-6">
        <Button variant="ghost" size="icon" aria-label="Go to home page">
          <Home className="h-5 w-5" />
        </Button>
      </Link>


      <div className="w-full max-w-sm space-y-4">
        {authMessage && (
          <div
            className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md text-sm"
            role="alert"
          >
            <p>{authMessage}</p>
          </div>
        )}
        <LoginForm />
      </div>
    </div>
  )
}
