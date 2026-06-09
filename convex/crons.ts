import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "publish scheduled blog posts",
  { minutes: 1 },
  internal.blogPosts.publishScheduled,
  {},
);

export default crons;
