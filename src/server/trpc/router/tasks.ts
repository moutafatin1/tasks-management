import { t } from "../trpc";
import { authedProcedure } from "./../trpc";

export const tasksRouter = t.router({
  all: authedProcedure.query(async ({ ctx: { prisma, session } }) => {
    const tasks = await prisma.task.findMany();
    return {
      tasks,
    };
  }),
});
