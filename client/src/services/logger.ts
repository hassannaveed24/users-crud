/* eslint-disable no-console */
export default class Logger {
  constructor(private namespace: string) {}
  log(...args: unknown[]) {
    if (process.env.NODE_ENV === "development") console.log(...args);
  }
  warn(...args: unknown[]) {
    if (process.env.NODE_ENV === "development") console.warn(...args);
  }
  error(...args: unknown[]) {
    if (process.env.NODE_ENV === "development") console.error(...args);
  }
}

export const defaultLogger = new Logger("main");
