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
      return await ctx.prisma.task.delete({
        where: {
          id: input.id,
        },
      });
    }),

  add: authedProcedure
    .input(z.object({ body: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const task = await ctx.prisma.task.create({
        data: {
          body: input.body,
          isCompleted: false,
          userId: ctx.session.user.id,
        },
      });
      return task;
    }),
});
