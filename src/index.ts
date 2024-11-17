import { createJob, createStep, createVaretPlugin } from "@varet/core";
import { exec, execSync } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const gitStep = createStep({
  name: "git",
  handler: async (message) => {
    message.start("Running the initial git job with varet");
    try {
      exec("varet git", (err, stdout, stderr) => {
        console.log(stdout);
      });
      message.succeed("git job successful");
    } catch (error) {
      console.error(error);
      message.fail("Git job failed");
    }
  },
  onError: "skip",
});

const job = createJob({
  name: "boilerplate",
  description: "git, @varet/core, basic command",
  steps: [gitStep],
});

const plugin = createVaretPlugin({
  name: "boilerplate",
  description: "Boilerplate generator for varet plugins.",
  jobs: [job],
});

export default plugin;
