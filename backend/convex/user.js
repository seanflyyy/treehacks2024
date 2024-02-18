import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      user_id: v.number(), // Assuming user_id is a string; adjust the type as necessary
      name: v.string() 
    },
    handler: async (ctx, args) => {
      // Include user_id and name in the object to be inserted
      const newUser = await ctx.db.insert("User", { 
        user_id: args.user_id, 
        name: args.name 
      });
      return newUser;
    },
  });
  