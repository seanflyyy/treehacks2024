/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.9.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as details from "../details.js";
import type * as education from "../education.js";
import type * as experiences from "../experiences.js";
import type * as projects from "../projects.js";
import type * as resume from "../resume.js";
import type * as skills from "../skills.js";
import type * as tasks from "../tasks.js";
import type * as user from "../user.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  details: typeof details;
  education: typeof education;
  experiences: typeof experiences;
  projects: typeof projects;
  resume: typeof resume;
  skills: typeof skills;
  tasks: typeof tasks;
  user: typeof user;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
