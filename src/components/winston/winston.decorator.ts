import { Inject } from "@nestjs/common";

export const contextsForLoggers: string[] = new Array<string>();

export function Logger(context = "") {
  if (!contextsForLoggers.includes(context)) contextsForLoggers.push(context);
  return Inject(`LoggerService${context}`);
}
