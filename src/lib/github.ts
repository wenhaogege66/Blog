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

// Fallback static data for when API fails
const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "Personal-Blog",
    full_name: "wenhaogege66/Personal-Blog",
    description: "Modern personal blog built with Next.js 14, TypeScript, and cutting-edge UI animations",
    html_url: "https://github.com/wenhaogege66/Personal-Blog",
    homepage: "https://wenhaogege.dpdns.org",
    topics: ["nextjs", "typescript", "blog", "framer-motion", "tailwindcss"],
    stargazers_count: 12,
    forks_count: 3,
    language: "TypeScript",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2025-01-22T00:00:00Z",
    pushed_at: "2025-01-22T00:00:00Z"
  },
  {
    id: 2,
    name: "HarmonyOS-Renderer",
    full_name: "wenhaogege66/HarmonyOS-Renderer",
    description: "ArkTS-based rendering library for HarmonyOS applications - Huawei internship project",
    html_url: "https://github.com/wenhaogege66/HarmonyOS-Renderer",
    homepage: null,
    topics: ["harmonyos", "arkts", "rendering", "mobile", "huawei"],
    stargazers_count: 8,
    forks_count: 2,
    language: "TypeScript",
    created_at: "2024-06-01T00:00:00Z",
    updated_at: "2024-12-01T00:00:00Z",
    pushed_at: "2024-12-01T00:00:00Z"
  },
  {
    id: 3,
    name: "AI-ML-Toolkit",
    full_name: "wenhaogege66/AI-ML-Toolkit",
    description: "Machine learning toolkit and utilities developed during AI startup internship",
    html_url: "https://github.com/wenhaogege66/AI-ML-Toolkit",
    homepage: null,
    topics: ["python", "machine-learning", "ai", "tensorflow", "pytorch"],
    stargazers_count: 15,
    forks_count: 5,
    language: "Python",
    created_at: "2024-08-01T00:00:00Z",
    updated_at: "2025-01-15T00:00:00Z",
    pushed_at: "2025-01-15T00:00:00Z"
  },
  {
    id: 4,
    name: "Xlab-Innovation-Platform",
    full_name: "wenhaogege66/Xlab-Innovation-Platform",
    description: "Cross-disciplinary innovation platform for Zhejiang University Xlab - Software Team Lead project",
    html_url: "https://github.com/wenhaogege66/Xlab-Innovation-Platform",
    homepage: null,
    topics: ["react", "nodejs", "innovation", "education", "collaboration"],
    stargazers_count: 6,
    forks_count: 1,
    language: "JavaScript",
    created_at: "2023-09-01T00:00:00Z",
    updated_at: "2024-11-01T00:00:00Z",
    pushed_at: "2024-11-01T00:00:00Z"
  }
];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=12`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      // If rate limited or other API error, return fallback data
      console.warn(`GitHub API failed: ${response.statusText}. Using fallback data.`);
      return FALLBACK_REPOS;
    }

    const repos = await response.json();
    
    // Filter out forks and sort by stars
    return repos
      .filter((repo: GitHubRepo) => !repo.name.includes("fork"))
      .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count);
  } catch (error) {
    console.warn('GitHub API request failed, using fallback data:', error);
    return FALLBACK_REPOS;
  }
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  // For now, just return top repos by stars
  // In a real implementation, you might use GraphQL API to get pinned repos
  const repos = await fetchGitHubRepos();
  return repos.slice(0, 6);
}