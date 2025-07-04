import ChatbotClient from "./chatbot-client";

export default function ChatbotPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline sm:text-5xl">AI Project Assistant</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Describe your skills and interests, and let our AI generate project ideas tailored just for you.
        </p>
      </div>
      <div className="mx-auto mt-10 max-w-4xl">
        <ChatbotClient />
      </div>
    </div>
  );
}
