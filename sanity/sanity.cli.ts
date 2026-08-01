import { defineCliConfig } from "sanity/cli";
import type { InlineConfig } from "vite";
import { dataset, projectId } from "./lib/env";

export default defineCliConfig({
  api: { projectId, dataset },
  studioHost: "zeropointbyx",
  vite: (prev: InlineConfig) => ({
    ...prev,
    server: {
      ...prev.server,
      allowedHosts: [".monkeycode-ai.live"],
    },
  }),
});
