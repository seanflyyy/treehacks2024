import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      resume_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      level_of_education: v.string(),
      school: v.string(),
      field_of_study: v.string(),
      school_location: v.string()
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newEducation = await ctx.db.insert("Education", { 
        resume_id: args.resume_id, 
        level_of_education: args.level_of_education,
        school: args.school,
        field_of_study: args.field_of_study,
        school_location: args.school_location
      });
      return newEducation;
    },
  });
  