import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import Header from '@/components/header';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/auth-context';

export const metadata: Metadata = {
  title: 'Projexa AI – AI-Powered Project Marketplace',
  description: 'An online marketplace for prebuilt software projects, custom project requests, and AI-based project recommendations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return (
        <html lang="en" className="dark">
        <head>
          <title>Firebase Configuration Error</title>
           <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
        </head>
        <body className={cn("font-body antialiased")}>
            <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
                <div className="text-center max-w-2xl bg-card border border-border rounded-lg p-8 shadow-lg">
                    <h1 className="text-3xl font-bold text-destructive mb-4 font-headline">Firebase Configuration Error</h1>
                    <p className="text-lg mb-2">The application is missing its Firebase configuration.</p>
                    <p className="text-muted-foreground mb-6">Please add your Firebase project's credentials to the <code className="bg-muted px-2 py-1 rounded-md font-code">.env</code> file to continue.</p>
                    <div className="text-left bg-background p-4 rounded-lg border">
                        <p className="font-bold mb-2 font-code">Your .env file should look like this:</p>
                        <pre className="text-sm bg-muted p-3 rounded-md overflow-x-auto font-code">
{`NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...`}
                        </pre>
                    </div>
                     <p className="text-sm text-muted-foreground mt-6">You can find these values in your Firebase project settings under "Your apps" &gt; Web app config.</p>
                </div>
            </div>
        </body>
        </html>
    )
  }

  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Source+Code+Pro:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body className={cn("font-body antialiased min-h-screen flex flex-col")}>
        <AuthProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
