import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ShoppingCart, Code } from 'lucide-react';
import { db } from "@/lib/firebase";
import { doc, getDoc, type DocumentData } from "firebase/firestore";

interface Project {
    id: string;
    title: string;
    description: string;
    techStack: string[];
    price: number;
    images: { url: string; hint: string }[];
    tags: string[];
}

async function getProject(id: string): Promise<Project | null> {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        return null;
    }

    const data = docSnap.data() as DocumentData;
    return {
        id: docSnap.id,
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        price: data.price,
        images: data.images,
        tags: data.tags,
    } as Project;
}

export default async function ProjectDetailsPage({ params }: { params: { id: string } }) {
  const project = await getProject(params.id);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {project.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="p-0">
                      <Image
                        src={image.url}
                        alt={`${project.title} screenshot ${index + 1}`}
                        width={800}
                        height={600}
                        className="rounded-lg object-cover aspect-video"
                        data-ai-hint={image.hint}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="ml-16" />
            <CarouselNext className="mr-16" />
          </Carousel>
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold font-headline">{project.title}</h1>
          <p className="text-muted-foreground text-lg">{project.description}</p>
          
          <div>
            <h2 className="text-2xl font-semibold font-headline flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-primary" /> Tech Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <Badge key={tech} variant="secondary" className="font-code text-base px-3 py-1">{tech}</Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between bg-card p-6 rounded-lg">
            <p className="text-4xl font-bold text-primary">₹{project.price}</p>
            <Button size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Buy Now
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
