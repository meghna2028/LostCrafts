import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { crafts } from "@/data/crafts";

export default defineTool({
  name: "get_craft",
  title: "Get craft details",
  description:
    "Get the full documentation for one craft: history, why it matters, materials and its status.",
  inputSchema: {
    craftId: z.string().min(1).describe("Craft id, e.g. 'rogan-art' (see list_crafts)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ craftId }) => {
    const craft = crafts.find((c) => c.id === craftId);
    if (!craft) throw new ToolError(`No craft found with id "${craftId}".`);
    const detail = {
      id: craft.id,
      name: craft.name,
      origin: craft.origin,
      tagline: craft.tagline,
      status: craft.status,
      history: craft.history,
      whyMatters: craft.whyMatters,
      materials: craft.materials,
      stepCount: craft.steps.length,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(detail, null, 2) }],
      structuredContent: { craft: detail },
    };
  },
});
