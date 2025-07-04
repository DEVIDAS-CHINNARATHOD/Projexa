import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl mb-10">Admin Panel</h1>
      <Tabs defaultValue="projects">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Manage Projects</TabsTrigger>
          <TabsTrigger value="requests">Manage Requests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Upload, edit, or remove projects from the marketplace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Project management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Requests</CardTitle>
              <CardDescription>Approve or reject custom project requests from users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-64 flex items-center justify-center">
                <p className="text-muted-foreground">Request management interface will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>View sales, user growth, and other key metrics.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 h-64 flex items-center justify-center">
              <p className="text-muted-foreground">Analytics dashboard will be here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
