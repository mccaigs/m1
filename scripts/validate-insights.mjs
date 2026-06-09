import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import matter from "gray-matter";

const contentDirectory = join(process.cwd(), "src", "content", "insights");
const requiredPublishedFields = ["title", "slug", "excerpt", "publishedAt", "category", "tags", "seoTitle", "seoDescription", "author"];
const statuses = new Set(["draft", "published", "archived"]);
const publishedSlugs = new Set();

const filenames = (await readdir(contentDirectory)).filter((filename) => filename.endsWith(".mdx"));

for (const filename of filenames) {
  const { data } = matter(await readFile(join(contentDirectory, filename), "utf8"));
  const status = data.status ?? "draft";

  if (!statuses.has(status)) {
    throw new Error(`${filename}: status must be draft, published, or archived.`);
  }

  if (status !== "published") {
    continue;
  }

  const missing = requiredPublishedFields.filter((field) => {
    if (field === "tags") {
      return !Array.isArray(data.tags) || data.tags.length === 0;
    }

    return typeof data[field] !== "string" || !data[field].trim();
  });

  if (missing.length > 0) {
    throw new Error(`${filename}: published post is missing required frontmatter: ${missing.join(", ")}.`);
  }

  const expectedSlug = filename.replace(/\.mdx$/, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(expectedSlug) || data.slug !== expectedSlug) {
    throw new Error(`${filename}: slug must match the lowercase kebab-case filename.`);
  }

  if (Number.isNaN(Date.parse(data.publishedAt))) {
    throw new Error(`${filename}: publishedAt must be a valid date.`);
  }

  if (data.updatedAt && Number.isNaN(Date.parse(data.updatedAt))) {
    throw new Error(`${filename}: updatedAt must be a valid date when provided.`);
  }

  if (publishedSlugs.has(data.slug)) {
    throw new Error(`${filename}: published slug "${data.slug}" is duplicated.`);
  }

  publishedSlugs.add(data.slug);
}

console.log(`Insights validation passed: ${publishedSlugs.size} published post(s), ${filenames.length} MDX file(s).`);
