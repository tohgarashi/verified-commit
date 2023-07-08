import * as core from "@actions/core";
import execute from "./execute";

const changedFiles = async (): Promise<string> => {
  let changedFiles = "";
  try {
    changedFiles = await execute("git status -uall --porcelain");
    core.info(`Changed files: ${changedFiles}`);
  } catch (error) {
    core.setFailed(`Failed to get commit status: ${error.message}`);
  }
  changedFiles = changedFiles
    .split("\n")
    .map((line) => line.substring(3))
    .join("\n");

  return changedFiles;
};

export default changedFiles;
