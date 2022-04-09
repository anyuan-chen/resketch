import { ErrorEvent } from "../types";

export function createError(msg: string): ErrorEvent {
  return {
    event: "error",
    error: msg,
  };
}
