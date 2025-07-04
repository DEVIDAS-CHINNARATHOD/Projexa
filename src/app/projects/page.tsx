import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { mockProjects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">Explore Projects</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find the perfect pre-built project to kickstart your next venture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockProjects.map(project => (
          <Card key={project.id} className="flex flex-col overflow-hidden transition-transform hover:scale-105 hover:shadow-primary/20 shadow-lg">
            <CardHeader className="p-0">
               <Link href={`/projects/${project.id}`}>
                <Image 
                  src={project.images[0].url} 
                  alt={project.title} 
                  width={600} 
                  height={400} 
                  className="w-full h-48 object-cover"
                  data-ai-hint={project.images[0].hint}
                />
              </Link>
            </CardHeader>
            <CardContent className="p-6 flex-grow">
              <CardTitle className="font-headline mb-2">{project.title}</CardTitle>
              <div className="flex flex-wrap gap-2 my-4">
                {project.techStack.map(tech => (
                  <Badge key={tech} variant="secondary" className="font-code">{tech}</Badge>
                ))}
              </div>
              <CardDescription className="text-primary font-bold text-xl">
                ₹{project.price}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 bg-secondary/30">
              <Button className="w-full" asChild>
                <Link href={`/projects/${project.id}`}>View Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
