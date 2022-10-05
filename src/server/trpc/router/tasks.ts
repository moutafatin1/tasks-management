import { z } from "zod";
import { t } from "../trpc";
import { authedProcedure } from "./../trpc";

export const tasksRouter = t.router({
  all: authedProcedure.query(async ({ ctx: { prisma, session } }) => {
    const tasks = await prisma.task.findMany();
    return {
      tasks,
    };
  }),
  delete: authedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
