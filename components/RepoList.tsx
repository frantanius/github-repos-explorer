"use client";

import { GitHubRepo } from "@/lib/github";

interface RepoListProps {
  repos: GitHubRepo[];
}

export default function RepoList({ repos }: RepoListProps) {
  return (
    <ul className="space-y-2">
      {repos.map((repo) => (
        <li key={repo.id} className="border p-3 rounded">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600"
          >
            {repo.name}
          </a>
          {repo.description && (
            <p className="text-sm text-muted-foreground">{repo.description}</p>
          )}
          <p className="text-xs mt-1 text-gray-500">
            ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count} | 🛠{" "}
            {repo.language || "N/A"}
          </p>
        </li>
      ))}
    </ul>
  );
}
