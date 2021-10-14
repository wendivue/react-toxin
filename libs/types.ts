type Optional<T extends Record<string, unknown>> = {
  [K in keyof T]: T[K] | null | undefined;
};

export type { Optional };
