"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Loader2 } from "lucide-react";
import { auth } from "@/lib/firebase";
import { GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.72 1.9-3.86 0-7-3.14-7-7s3.14-7 7-7c1.73 0 3.26.68 4.35 1.62l2.45-2.45C18.27.8 15.48 0 12.48 0 5.88 0 0 5.88 0 12s5.88 12 12.48 12c7.25 0 11.26-5.06 11.26-11.45 0-.75-.06-1.5-.18-2.23H12.48z" />
    </svg>
);

export default function LoginPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  useEffect(() => {
    setLoading(true);
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // This is the signed-in user
          const user = result.user;
          console.log("User signed in with redirect:", user);
          router.push('/dashboard');
        }
      })
      .catch((error) => {
        console.error("Error during redirect result:", error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [router]);


  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      // The page will redirect, and the result is handled in the useEffect
    } catch (error: any) {
      console.error("Sign in error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  if (user) {
    return null; // or a loading spinner while redirecting
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <Code className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-3xl font-headline">Welcome to Projexa AI</CardTitle>
          <CardDescription>Sign in to access your dashboard and start creating.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button variant="outline" className="w-full" size="lg" onClick={handleSignIn} disabled={loading}>
            {loading ? (
                <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
            ) : (
                <GoogleIcon className="mr-2 h-5 w-5 fill-white" />
            )}
            Sign in with Google
          </Button>
          {error && <p className="text-center text-sm text-destructive">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
}
