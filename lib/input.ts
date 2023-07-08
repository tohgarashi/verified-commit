import * as core from "@actions/core";

export interface InputStringOptions extends core.InputOptions {
  /** Optional. Default value to use for an input option if the option is not set. */
  default?: string | null;
}

export interface InputBooleanOptions extends core.InputOptions {
  /** Optional. Default value to use for an input option if the option is not set. */
  default?: boolean | null;
}

export function getInput(
  name: string,
  options: InputStringOptions = {}
): string | null {
  const value = core.getInput(name, options);

  if (!value && options.default) {
    core.debug(`${name}: ${options.default}`);
    return options.default;
  }

  core.debug(`${name}: ${value}`);
  return value;
}

export function getBooleanInput(
  name: string,
  options: InputBooleanOptions = {}
): boolean | null {
  const value = (() => {
    try {
      return core.getBooleanInput(name, options);
    } catch (e) {
      if (options.default != null) {
        return options.default;
      }
      core.debug(e);
      return false;
    }
  })();

  core.debug(`${name}: ${value}`);
  return value;
}
