import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      resume_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      name: v.string(),
      phone: v.string(),
      email: v.string(),
      linkedin: v.string(),
      github : v.string(),
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newDetails = await ctx.db.insert("Details", { 
        resume_id: args.resume_id, 
        name: args.name,
        phone: args.phone,
        email: args.email,
        linkedin: args.linkedin,
        github: args.github
      });
      return newDetails;
    },
  });