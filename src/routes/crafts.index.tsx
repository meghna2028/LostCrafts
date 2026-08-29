import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { CraftCard } from "@/components/CraftCard";
import { crafts } from "@/data/crafts";

export const Route = createFileRoute("/crafts/")({
  head: () => ({
    meta: [
      { title: "Explore Crafts of Rajasthan — LostCraft" },
      {
        name: "description",
        content:
          "Rogan Art, Molela Terracotta, Lac Bangles and Jaipur Blue Pottery — four endangered Rajasthani crafts.",
      },
      { property: "og:title", content: "Explore Crafts of Rajasthan — LostCraft" },
      {
        property: "og:description",
        content:
          "Rogan Art, Molela Terracotta, Lac Bangles and Jaipur Blue Pottery — four endangered Rajasthani crafts.",
      },
    ],
  }),
  component: ExploreCrafts,
});

function ExploreCrafts() {
  return (
    <PageShell title="Explore Crafts" subtitle="Four traditions from Rajasthan" backTo="/home">
      <div className="grid grid-cols-1 gap-5">
        {crafts.map((craft, i) => (
          <CraftCard key={craft.id} craft={craft} index={i} />
        ))}
      </div>
    </PageShell>
  );
}
