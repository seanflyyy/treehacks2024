import { query } from "../_generated/server";

export const get = query({
  handler: async ({ db }) => {
    return await db.query("jobpost")
    .filter((q) => q.eq(q.field("score"), -1))
    .collect();
  },
});

