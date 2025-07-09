"use client";

import { GitHubUser } from "@/lib/github";

interface UserListProps {
  users: GitHubUser[];
  onSelect: (user: GitHubUser) => void;
}

export default function UserList({ users, onSelect }: UserListProps) {
  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center gap-3 cursor-pointer hover:bg-muted p-2 rounded"
          onClick={() => onSelect(user)}
        >
          <img
            src={user.avatar_url}
            alt={user.login}
            className="w-8 h-8 rounded-full"
          />
          <span>{user.login}</span>
        </li>
      ))}
    </ul>
  );
}
