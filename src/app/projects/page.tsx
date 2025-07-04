import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const mockProjects = [
  {
    id: '1',
    title: "Smart Attendance System",
    techStack: ["Python", "OpenCV", "Firebase"],
    price: 499,
    previewURL: "https://placehold.co/600x400.png",
    tags: ["ML", "Computer Vision"],
    dataAiHint: "facial recognition software"
  },
  {
    id: '2',
    title: "MERN-based Chat App",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    price: 799,
    previewURL: "https://placehold.co/600x400.png",
    tags: ["Web Dev", "Real-time"],
    dataAiHint: "chat application interface"
  },
  {
    id: '3',
    title: "E-commerce Platform",
    techStack: ["Next.js", "Stripe", "PostgreSQL"],
    price: 1299,
    previewURL: "https://placehold.co/600x400.png",
    tags: ["Full-stack", "Payments"],
    dataAiHint: "online store homepage"
  },
  {
    id: '4',
    title: "AI-Powered Blog Generator",
    techStack: ["Python", "Flask", "GPT-3"],
    price: 650,
    previewURL: "https://placehold.co/600x400.png",
    tags: ["AI", "Content Creation"],
    dataAiHint: "artificial intelligence writing"
  },
];


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
              <Image 
                src={project.previewURL} 
                alt={project.title} 
                width={600} 
                height={400} 
                className="w-full h-48 object-cover"
                data-ai-hint={project.dataAiHint}
              />
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
              <Button className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
