import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { crafts } from "@/data/crafts";

const craftSummary = z.object({
  id: z.string(),
  name: z.string(),
  origin: z.string(),
  tagline: z.string(),
  status: z.string(),
  stepCount: z.number(),
});

export default defineTool({
  name: "list_crafts",
  title: "List crafts",
  description:
    "List all traditional Rajasthani crafts documented in LostCraft, with their id, name, origin, tagline and endangerment status.",
  inputSchema: {},
  outputSchema: { crafts: z.array(craftSummary) },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const rows = crafts.map((c) => ({
      id: c.id,
      name: c.name,
      origin: c.origin,
      tagline: c.tagline,
      status: c.status,
      stepCount: c.steps.length,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(rows, null, 2) }],
      structuredContent: { crafts: rows },
    };
  },
});
