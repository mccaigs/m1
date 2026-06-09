/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as blogPosts from "../blogPosts.js";
import type * as clients from "../clients.js";
import type * as crons from "../crons.js";
import type * as enquiries from "../enquiries.js";
import type * as leadAssignments from "../leadAssignments.js";
import type * as projectAssets from "../projectAssets.js";
import type * as projectUpdates from "../projectUpdates.js";
import type * as projects from "../projects.js";
import type * as quoteBuilderSubmissions from "../quoteBuilderSubmissions.js";
import type * as studioAuth from "../studioAuth.js";
import type * as studioSeed from "../studioSeed.js";
import type * as userRoles from "../userRoles.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  blogPosts: typeof blogPosts;
  clients: typeof clients;
  crons: typeof crons;
  enquiries: typeof enquiries;
  leadAssignments: typeof leadAssignments;
  projectAssets: typeof projectAssets;
  projectUpdates: typeof projectUpdates;
  projects: typeof projects;
  quoteBuilderSubmissions: typeof quoteBuilderSubmissions;
  studioAuth: typeof studioAuth;
  studioSeed: typeof studioSeed;
  userRoles: typeof userRoles;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
