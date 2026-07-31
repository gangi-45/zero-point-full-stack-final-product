import { defineCliConfig } from "sanity/cli";
import { dataset, projectId } from "./lib/env";

export default defineCliConfig({
  api: { projectId, dataset },
  vite: (prev) => ({
    ...prev,
    server: {
      ...prev.server,
      allowedHosts: [".monkeycode-ai.live"],
    },
  }),
});
