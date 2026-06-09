export const blogAuthors = [
  {
    key: "david",
    name: "David Robertson",
    role: "Founder",
    bio: "Founder of McCaigs, focused on practical software, AI systems, and technical delivery.",
    avatar: "/brand/mccaigs-logo.svg",
  },
  {
    key: "matt",
    name: "Matt",
    role: "Technical Writer",
    bio: "A display-only studio voice for clear technical explanations and practical field notes.",
    avatar: "/brand/mccaigs-logo.svg",
  },
  {
    key: "kirsty",
    name: "Kirsty",
    role: "Studio Contributor",
    bio: "A display-only contributor profile for studio perspectives and operational observations.",
    avatar: "/brand/mccaigs-logo.svg",
  },
] as const;

export type BlogAuthorKey = (typeof blogAuthors)[number]["key"];

export function getBlogAuthor(key: string) {
  return blogAuthors.find((author) => author.key === key);
}
