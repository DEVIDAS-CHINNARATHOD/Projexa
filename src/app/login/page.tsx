import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.72 1.9-3.86 0-7-3.14-7-7s3.14-7 7-7c1.73 0 3.26.68 4.35 1.62l2.45-2.45C18.27.8 15.48 0 12.48 0 5.88 0 0 5.88 0 12s5.88 12 12.48 12c7.25 0 11.26-5.06 11.26-11.45 0-.75-.06-1.5-.18-2.23H12.48z" />
    </svg>
);


export default function LoginPage() {
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
        <CardContent>
          <Button variant="outline" className="w-full" size="lg">
            <GoogleIcon className="mr-2 h-5 w-5 fill-white" />
            Sign in with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
