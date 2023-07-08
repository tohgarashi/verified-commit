import * as exec from "@actions/exec";

const execute = async (command: string): Promise<string> => {
  let output = "";
  const options = {
    listeners: {
      stdout: (data: Buffer) => {
        output += data.toString();
      },
      stderr: (data: Buffer) => {
        console.error(data);
      },
    },
  };
  await exec.exec(command, null, options);
  return output;
};

export default execute;
