import { eq, desc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { tasks } from "~/server/db/schema/todo";

export const todoRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    return ctx.db
      .select()
      .from(tasks)
      .where(eq(tasks.createdById, ctx.session.user.id))
      .orderBy(desc(tasks.createdAt));
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tasks).values({
        title: input.title,
        createdById: ctx.session.user.id,
      });
    }),
  setDescription: protectedProcedure
    .input(z.object({ id: z.number(), description: z.string().optional() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ description: input.description })
        .where(eq(tasks.id, input.id));
    }),
  setIsBlocked: protectedProcedure
    .input(z.object({ id: z.number(), isBlocked: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ isBlocked: input.isBlocked })
        .where(eq(tasks.id, input.id));
    }),
  setIsDone: protectedProcedure
    .input(z.object({ id: z.number(), isDone: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ isDone: input.isDone })
        .where(eq(tasks.id, input.id));
    }),
  setIsImportant: protectedProcedure
    .input(z.object({ id: z.number(), isImportant: z.boolean().optional() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ isImportant: input.isImportant })
        .where(eq(tasks.id, input.id));
    }),
  setIsUrgent: protectedProcedure
    .input(z.object({ id: z.number(), isUrgent: z.boolean().optional() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ isUrgent: input.isUrgent })
        .where(eq(tasks.id, input.id));
    }),
  setTitle: protectedProcedure
    .input(z.object({ id: z.number(), title: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(tasks)
        .set({ title: input.title })
        .where(eq(tasks.id, input.id));
    }),
});
