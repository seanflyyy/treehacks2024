import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      resume_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      title: v.string(),
      description: v.string(),
      technologies: v.array(v.string())
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newProjects = await ctx.db.insert("Projects", { 
        resume_id: args.resume_id, 
        title: args.title,
        description: args.description,
        technologies: args.technologies
      });
      return newProjects;
    },
  });