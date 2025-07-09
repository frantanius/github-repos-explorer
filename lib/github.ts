export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
}

/**
 * Search GitHub users based on query (max 5 results)
 */
export async function fetchUsers(query: string): Promise<GitHubUser[]> {
  const res = await fetch(
    `https://api.github.com/search/users?q=${query}&per_page=5`
  );
  if (!res.ok) {
    throw new Error(`Error fetching users: ${res.statusText}`);
  }
  const data = await res.json();
  return data.items as GitHubUser[];
}

/**
 * Get repositories for a specific GitHub user
 */
export async function fetchUserRepos(username: string): Promise<GitHubRepo[]> {
  const res = await fetch(`https://api.github.com/users/${username}/repos`);
  if (!res.ok) {
    throw new Error(
      `Error fetching repositories for ${username}: ${res.statusText}`
    );
  }
  return res.json();
}
