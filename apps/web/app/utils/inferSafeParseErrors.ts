import type { z } from "zod";

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
export type inferSafeParseErrors<
  T extends z.ZodType<any, any, any>,
  U = string
> = {
  fieldErrors: {
    [P in keyof z.infer<T>]?: U[];
  };
};
