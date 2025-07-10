export interface GitHubUser {
  login: string;
  id: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}

// --------------------
// GitHub API Endpoints
// --------------------
const GITHUB_API_BASE = "https://api.github.com";

const githubUrls = {
  searchUsers: (query: string) =>
    `${GITHUB_API_BASE}/search/users?q=${encodeURIComponent(query)}&per_page=5`,
  userRepos: (username: string) =>
    `${GITHUB_API_BASE}/users/${encodeURIComponent(username)}/repos`,
};

// ------------------------
// Generic Fetch Helper
// ------------------------
async function fetchFromGitHub<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.statusText}`);
  }
  return res.json();
}

// ------------------------
// Public API Functions
// ------------------------
export async function fetchUsers(query: string): Promise<GitHubUser[]> {
  const url = githubUrls.searchUsers(query);
  const data = await fetchFromGitHub<{ items: GitHubUser[] }>(url);
  return data.items;
}

export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const url = githubUrls.userRepos(username);
  return fetchFromGitHub<GitHubRepo[]>(url);
}
