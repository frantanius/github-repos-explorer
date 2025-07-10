"use client";

import { GitHubRepo } from "@/lib/github";
import { RepoSkeleton } from "@/components/Skeletons";

interface UserRepoListProps {
  repos: GitHubRepo[];
  loading?: boolean;
}

export default function UserRepoList({
  repos,
  loading = false,
}: UserRepoListProps) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, i) => (
          <RepoSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No repositories found.</p>
    );
  }

  return (
    <ul className="space-y-2">
      {repos.map((repo) => (
        <li
          key={repo.id}
          className="border p-3 rounded hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center justify-between">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline"
              aria-label={`Open GitHub repo: ${repo.name}`}
            >
              {repo.name}
            </a>
            <span className="text-sm text-gray-500">
              ⭐ {repo.stargazers_count}
            </span>
          </div>

          {repo.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {repo.description}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}
