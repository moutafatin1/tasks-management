// src/server/trpc/router/index.ts
import { t } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { tasksRouter } from "./tasks";

export const appRouter = t.router({
  example: exampleRouter,
  auth: authRouter,
  tasks: tasksRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
