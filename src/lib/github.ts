interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  topics: string[];
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  created_at: string;
  updated_at: string;
  pushed_at: string;
}

interface GitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  twitter_username: string | null;
}

const GITHUB_USERNAME = "wenhaogege66";
const GITHUB_API_BASE = "https://api.github.com";

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${GITHUB_USERNAME}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=12`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repos: ${response.statusText}`);
  }

  const repos = await response.json();
  
  // Filter out forks and sort by stars
  return repos
    .filter((repo: GitHubRepo) => !repo.name.includes("fork"))
    .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  // For now, just return top repos by stars
  // In a real implementation, you might use GraphQL API to get pinned repos
  const repos = await fetchGitHubRepos();
  return repos.slice(0, 6);
}