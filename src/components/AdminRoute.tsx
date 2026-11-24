import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Loader2, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

type State = "loading" | "allowed" | "denied";

/** Gates every admin route behind a Supabase session and the admin allowlist. */
const AdminRoute = () => {
  const location = useLocation();
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!active) return;
      if (!data.session) {
        setState("denied");
        return;
      }
      const { data: isAdmin, error } = await supabase.rpc("is_admin");
      if (!active) return;
      setState(!error && isAdmin === true ? "allowed" : "denied");
    })();
    return () => {
      active = false;
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center" role="status">
        <Loader2 className="animate-spin text-muted-foreground" aria-hidden="true" />
        <span className="sr-only">Checking access…</span>
      </div>
    );
  }

  if (state === "denied") {
    const next = encodeURIComponent(location.pathname + location.search);
    if (!location.pathname.startsWith("/admin")) return <Navigate to="/" replace />;
    return (
      <main className="flex min-h-screen items-center justify-center px-4">
        <div className="max-w-md space-y-4 text-center">
          <h1 className="font-serif text-3xl">Staff access only</h1>
          <p className="text-sm text-muted-foreground">
            Sign in with a staff account that has been added to the admissions admin list.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild>
              <a href={`/login?next=${next}`}>Sign in</a>
            </Button>
            <Button variant="outline" onClick={() => void supabase.auth.signOut()}>
              <LogOut size={16} className="mr-2" aria-hidden="true" />
              Sign out
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return <Outlet />;
};

export default AdminRoute;
