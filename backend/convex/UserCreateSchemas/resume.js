import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const resumepost = mutation({
    args: { 
      user_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      resume_id: v.number() 
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newResume = await ctx.db.insert("Resume", { 
        user_id: args.user_id, 
        resume_id: args.resume_id 
      });
      return newResume;
    },
  });