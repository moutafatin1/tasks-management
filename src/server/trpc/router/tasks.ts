import { z } from "zod";
import { t } from "../trpc";
import { authedProcedure } from "./../trpc";

export const tasksRouter = t.router({
  all: authedProcedure
    .input(
      z
        .object({
          status: z.boolean().nullable(),
        })
        .nullish()
    )
    .query(async ({ ctx: { prisma, session }, input }) => {
      const tasks = await prisma.task.findMany({
        where: {
          ...(input?.status !== null ? { isCompleted: input?.status } : {}),
        },
      });
      return {
        tasks,
      };
    }),
  byId: authedProcedure.input(z.string()).query(({ ctx, input }) => {
    const task = ctx.prisma.task.findUnique({
      where: {
        id: input,
      },
    });
    return task;
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

  toggleIsCompleted: authedProcedure
    .input(
      z.object({
        id: z.string(),
        status: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updateTask = ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: !input.status,
        },
      });
      return updateTask;
    }),

  update: authedProcedure
    .input(
      z.object({
        id: z.string(),
        body: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const updateTask = ctx.prisma.task.update({
        where: {
          id: input.id,
        },
        data: {
          body: input.body,
        },
      });
      return updateTask;
    }),
});
