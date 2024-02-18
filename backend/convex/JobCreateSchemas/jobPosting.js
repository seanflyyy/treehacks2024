import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      company_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      title: v.string(),
      description: v.string(),
      score: v.number(),
      url: v.string()
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newJob = await ctx.db.insert("jobpost", { 
        company_id: args.company_id, 
        title: args.title,
        description: args.description,
        score: args.score,
        url: args.url
      });
      return newJob;
    },
  });