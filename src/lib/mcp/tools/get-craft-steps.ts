import { defineTool, ToolError } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { crafts } from "@/data/crafts";

export default defineTool({
  name: "get_craft_steps",
  title: "Get craft learning steps",
  description: "Get the ordered step-by-step learning guide for one craft.",
  inputSchema: {
    craftId: z.string().min(1).describe("Craft id, e.g. 'blue-pottery' (see list_crafts)."),
  },
  outputSchema: {
    craft: z.string(),
    steps: z.array(z.object({ step: z.number(), title: z.string(), description: z.string() })),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ craftId }) => {
    const craft = crafts.find((c) => c.id === craftId);
    if (!craft) throw new ToolError(`No craft found with id "${craftId}".`);
    const steps = craft.steps.map((s, i) => ({ step: i + 1, ...s }));
    return {
      content: [{ type: "text", text: JSON.stringify({ craft: craft.name, steps }, null, 2) }],
      structuredContent: { craft: craft.name, steps },
    };
  },
});
