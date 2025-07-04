import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function RequestPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex justify-center">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-3xl font-headline">Request a Custom Project</CardTitle>
          <CardDescription>Have a specific idea in mind? Fill out the form below and we'll get back to you.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Project Description</Label>
              <Textarea id="description" placeholder="Describe your project requirements in detail..." className="min-h-[150px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deadline">Ideal Deadline</Label>
              <Input id="deadline" type="date" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget">Budget (INR)</Label>
              <Input id="budget" type="number" placeholder="e.g., 10000" />
            </div>
            <Button type="submit" className="w-full" size="lg">Submit Request</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
