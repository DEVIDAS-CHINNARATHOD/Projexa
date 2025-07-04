import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RequestClientForm from "./request-client";

export default function RequestPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Request a Custom Project</CardTitle>
          <CardDescription>Have a specific idea in mind? Fill out the form below and we'll get back to you.</CardDescription>
        </CardHeader>
        <CardContent>
            <RequestClientForm />
        </CardContent>
      </Card>
    </div>
  );
}
