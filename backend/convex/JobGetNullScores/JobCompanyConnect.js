import { query } from "../_generated/server";
import { v } from "convex/values";

export const get = query({
    args: { 
        company_id: v.number() // Use v.number() if company_id is a numeric value
    },
    handler: async ({ ctx, args }) => {
        return await ctx.db.query("Company")
            .filter((q) => q.eq(q.field("company_id"), args.company_id))
            .collect();
    },
});
