import "server-only";

const githubApi = "https://api.github.com";

type GitHubConfig = {
  branch: string;
  owner: string;
  repo: string;
  token: string;
};

export type GitHubCommitResult = {
  commitSha: string;
  commitUrl: string;
  path: string;
  sha?: string;
};

type GitHubFile = {
  content: string;
  path: string;
  sha: string;
};

function getConfig(): GitHubConfig {
  const owner = process.env.GITHUB_OWNER?.trim();
  const repo = process.env.GITHUB_REPO?.trim();
  const branch = process.env.GITHUB_BRANCH?.trim() || "main";
  const token = process.env.GITHUB_TOKEN?.trim();
  if (!owner || !repo || !token) {
    const missing = [
      !owner && "GITHUB_OWNER",
      !repo && "GITHUB_REPO",
      !token && "GITHUB_TOKEN",
    ].filter(Boolean);
    throw new Error(
      `GitHub publishing is not configured. Missing ${missing.join(", ")}.`,
    );
  }
  return { branch, owner, repo, token };
}

function encodedPath(path: string) {
  return path.split("/").map(encodeURIComponent).join("/");
}

async function githubRequest<T>(
  path: string,
  init: RequestInit = {},
  allowNotFound = false,
): Promise<T | null> {
  const config = getConfig();
  const response = await fetch(
    `${githubApi}/repos/${encodeURIComponent(config.owner)}/${encodeURIComponent(config.repo)}${path}`,
    {
      ...init,
      cache: "no-store",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
        ...init.headers,
      },
    },
  );
  if (allowNotFound && response.status === 404) return null;
  if (!response.ok) {
    const requestId = response.headers.get("x-github-request-id");
    const suffix = requestId ? ` GitHub request ${requestId}.` : "";
    if (response.status === 401 || response.status === 403) {
      throw new Error(`GitHub rejected the publishing credentials.${suffix}`);
    }
    if (response.status === 404) {
      throw new Error(`The configured GitHub repository or branch was not found.${suffix}`);
    }
    if (response.status === 409 || response.status === 422) {
      throw new Error(`GitHub could not apply the repository change. Retry after refreshing.${suffix}`);
    }
    throw new Error(`GitHub publishing failed with status ${response.status}.${suffix}`);
  }
  return response.json() as Promise<T>;
}

export async function readGitHubFile(path: string) {
  const config = getConfig();
  const file = await githubRequest<GitHubFile>(
    `/contents/${encodedPath(path)}?ref=${encodeURIComponent(config.branch)}`,
    {},
    true,
  );
  if (!file) return null;
  return {
    content: Buffer.from(file.content.replace(/\n/g, ""), "base64").toString("utf8"),
    path: file.path,
    sha: file.sha,
  };
}

export async function commitGitHubFile({
  content,
  message,
  path,
}: {
  content: Buffer | string;
  message: string;
  path: string;
}): Promise<GitHubCommitResult> {
  const config = getConfig();
  const existing = await readGitHubFile(path);
  const result = await githubRequest<{
    commit: { html_url: string; sha: string };
    content?: { path: string; sha: string };
  }>(`/contents/${encodedPath(path)}`, {
    method: "PUT",
    body: JSON.stringify({
      branch: config.branch,
      content: Buffer.from(content).toString("base64"),
      message,
      sha: existing?.sha,
    }),
  });
  if (!result) throw new Error("GitHub did not return commit metadata.");
  return {
    commitSha: result.commit.sha,
    commitUrl: result.commit.html_url,
    path: result.content?.path ?? path,
    sha: result.content?.sha,
  };
}

export async function deleteGitHubFile({
  message,
  path,
}: {
  message: string;
  path: string;
}): Promise<GitHubCommitResult | null> {
  const config = getConfig();
  const existing = await readGitHubFile(path);
  if (!existing) return null;
  const result = await githubRequest<{
    commit: { html_url: string; sha: string };
  }>(`/contents/${encodedPath(path)}`, {
    method: "DELETE",
    body: JSON.stringify({
      branch: config.branch,
      message,
      sha: existing.sha,
    }),
  });
  if (!result) throw new Error("GitHub did not return deletion commit metadata.");
  return {
    commitSha: result.commit.sha,
    commitUrl: result.commit.html_url,
    path,
  };
}
