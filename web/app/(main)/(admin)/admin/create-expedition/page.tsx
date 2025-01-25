import { ExpeditionForm } from "@/components/forms/create-expedition";
import Container from "@/components/ui/container";

export default function CreateExpeditionPage() {
  return (
    <Container className="py-10">
      <h1 className="text-3xl font-bold mb-6">Create New Expedition</h1>
      <ExpeditionForm />
    </Container>
  );
}
