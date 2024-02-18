import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      resume_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      company: v.string(),
      position: v.string(),
      date: v.string(),
      responsibilities: v.array(v.string())
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newExperiences = await ctx.db.insert("Experiences", { 
        resume_id: args.resume_id, 
        company: args.company,
        position: args.position,
        date: args.date,
        responsibilities: args.responsibilities
      });
      return newExperiences;
    },
  });