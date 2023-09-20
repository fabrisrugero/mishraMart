import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const file = mutation({
  args: {
    // src: v.array(v.string()),
    src: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("file", { src: args.src });
  },
});

export const getFile = query({
  handler: async (ctx) => {
    return ctx.db.query("file").collect();
  },
});
