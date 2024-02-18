import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      resume_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      skills: v.array(v.string())
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newSkills = await ctx.db.insert("Skills", { 
        resume_id: args.resume_id, 
        skills: args.skills
      });
      return newSkills;
    },
  });