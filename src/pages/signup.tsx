import { SignUp } from "@/components/signup-form";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">

      <Link to="/" className="absolute top-6 left-6">
        <Button variant="ghost" size="icon" aria-label="Go to home page">
          <Home className="h-5 w-5" />
        </Button>
      </Link>

      <div className="w-full max-w-sm">
        <SignUp />
      </div>
    </div>
  )
}
