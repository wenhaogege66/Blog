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
  fork: boolean;
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

// Minimal fallback - we want to show real projects from GitHub API only
const FALLBACK_REPOS: GitHubRepo[] = [
  // Empty - rely on real GitHub API data only
];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?type=public&sort=updated&per_page=20`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'wenhaogege-blog'
        }
      }
    );

    if (!response.ok) {
      console.warn(`GitHub API failed: ${response.status} ${response.statusText}`);
      return FALLBACK_REPOS;
    }

    const repos = await response.json();
    console.log(`Fetched ${repos.length} repositories from GitHub API`);
    
    // Filter and sort for meaningful projects
    return repos
      .filter((repo: GitHubRepo) => 
        !repo.fork && // Not a fork
        repo.description && // Has description
        repo.name !== GITHUB_USERNAME && // Not profile README
        !repo.name.toLowerCase().includes('test') && // Not test repos
        !repo.name.toLowerCase().includes('demo') // Not demo repos
      )
      .sort((a: GitHubRepo, b: GitHubRepo) => {
        // Sort by activity (last push) then by stars
        const dateDiff = new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
        if (Math.abs(dateDiff) < 30 * 24 * 60 * 60 * 1000) { // If within 30 days, sort by stars
          return b.stargazers_count - a.stargazers_count;
        }
        return dateDiff;
      })
      .slice(0, 6); // Show top 6 repositories
  } catch (error) {
    console.warn('GitHub API request failed:', error);
    return FALLBACK_REPOS;
  }
}

export async function fetchPinnedRepos(): Promise<GitHubRepo[]> {
  // For now, just return top repos by stars
  // In a real implementation, you might use GraphQL API to get pinned repos
  const repos = await fetchGitHubRepos();
  return repos.slice(0, 6);
}