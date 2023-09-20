import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = mutation({
  args: {
    src: v.array(v.string()),
    // text: v.string(),
  },
  handler: async (ctx, args) => {
    const taskId = await ctx.db.insert("list", { text: args.src });
  },
});

export const getCategory = query({
  handler: async (ctx) => {
    return ctx.db.query("Category").collect();
  },
});
