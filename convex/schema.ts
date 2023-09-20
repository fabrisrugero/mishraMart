import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  Category: defineTable({ name: v.string() }),
  Image: defineTable({
    productId: v.id("Product"),
    url: v.string(),
  }),
  Product: defineTable({
    categoryId: v.id("Category"),
    name: v.string(),
    price: v.float64(),
  }),
  list: defineTable({ text: v.array(v.string()) }),
  file: defineTable({ src: v.string() }),
});
