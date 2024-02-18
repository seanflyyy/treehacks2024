import { mutation } from "../_generated/server";
import { v } from "convex/values";

// Create a new task with the given text
export const post = mutation({
    args: { 
      company_id: v.number(),
      company_name: v.string()
    },
    handler: async (ctx, args) => {
     
      const newCompany = await ctx.db.insert("Company", { 
        company_id: args.company_id, 
        company_name: args.company_name
      });
      return newCompany;
    },
  });