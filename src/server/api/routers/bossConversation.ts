import { eq, asc } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { bossConversations } from "~/server/db/schema/bossConversation";

export const bossConversationRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const data = await ctx.db
      .select({
        accomplishments: bossConversations.accomplishments,
        challenges: bossConversations.challenges,
        createdAt: bossConversations.createdAt,
        id: bossConversations.id,
        notes: bossConversations.notes,
        priorities: bossConversations.priorities,
      })
      .from(bossConversations)
      .where(eq(bossConversations.createdById, ctx.auth.userId))
      .orderBy(asc(bossConversations.createdAt));

    // Map the null values to undefined because that's easier for React
    return data.map((conversation) => ({
      ...conversation,
      accomplishments: conversation.accomplishments ?? undefined,
      challenges: conversation.challenges ?? undefined,
      notes: conversation.notes ?? undefined,
      priorities: conversation.priorities ?? undefined,
    }));
  }),

  create: protectedProcedure
    .input(
      z.object({
        createdAt: z.date(),
        date: z.date(),
        accomplishments: z.string().optional(),
        challenges: z.string().optional(),
        notes: z.string().optional(),
        priorities: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db
        .insert(bossConversations)
        .values({
          ...input,
          createdById: ctx.auth.userId,
          date: input.date.toISOString(),
        })
        .returning({ id: bossConversations.id });
      return result[0]!.id;
    }),

  update: protectedProcedure
    .input(
      z.object({
        accomplishments: z.string().optional(),
        challenges: z.string().optional(),
        date: z.date().optional(),
        id: z.number(),
        notes: z.string().optional(),
        priorities: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .update(bossConversations)
        .set({
          ...input,
          date: input.date?.toISOString(),
        })
        .where(eq(bossConversations.id, input.id));
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(bossConversations)
        .where(eq(bossConversations.id, input.id));
    }),
});
