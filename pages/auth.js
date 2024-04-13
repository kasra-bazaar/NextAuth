import { useEffect, useState } from "react";
import AuthForm from "../components/auth/auth-form";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, [router]);
  if (loading) {
    return <p> loading ...</p>;
  }
  return <AuthForm />;
}

export default AuthPage;
