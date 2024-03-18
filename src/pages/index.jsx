import Hero from "@/components/Hero";
import Layout from "@/components/Layout";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {

  return (
    <Layout
      title="test"
      description="test"
    >
      <Hero />
    </Layout>
  );
}
