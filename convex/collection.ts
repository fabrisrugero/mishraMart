import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getCategory = query({
  handler: async (ctx) => {
    return ctx.db.query("Category").collect();
  },
});
export const getProducts = query({
  handler: async (ctx) => {
    return ctx.db.query("Product").collect();
  },
});
export const getImages = query({
  handler: async (ctx) => {
    return ctx.db.query("Image").collect();
  },
});
