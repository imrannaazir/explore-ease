import Container from "@/components/ui/container";
import { ExpeditionList } from "../components/expedition-list";

export default function ExpeditionsPage() {
  return (
    <Container className=" py-10 ">
      <h1 className="text-3xl font-bold mb-6">Available Expeditions</h1>
      <ExpeditionList />
    </Container>
  );
}
