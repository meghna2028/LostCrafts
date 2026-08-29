import { defineMcp } from "@lovable.dev/mcp-js";
import listCrafts from "./tools/list-crafts";
import getCraft from "./tools/get-craft";
import getCraftSteps from "./tools/get-craft-steps";

export default defineMcp({
  name: "lostcraft",
  title: "LostCraft",
  version: "0.1.0",
  instructions:
    "Tools for LostCraft, an archive of disappearing traditional Rajasthani crafts. Use `list_crafts` to browse, `get_craft` for history and why a craft matters, and `get_craft_steps` for its learning guide.",
  tools: [listCrafts, getCraft, getCraftSteps],
});
