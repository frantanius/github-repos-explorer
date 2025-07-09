"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers, fetchUserRepos, GitHubUser } from "@/lib/github";
import SearchInput from "@/components/SearchInput";
import UserList from "@/components/UserList";
import RepoList from "@/components/RepoList";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<GitHubUser | null>(null);

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["search-users", query],
    queryFn: () => fetchUsers(query),
    enabled: false,
  });

  const {
    data: repos,
    isLoading: isLoadingRepos,
    isError: isErrorRepos,
  } = useQuery({
    queryKey: ["user-repos", selectedUser?.login],
    queryFn: () => fetchUserRepos(selectedUser!.login),
    enabled: !!selectedUser,
  });

  const handleSearch = () => {
    setSelectedUser(null);
    if (query.trim()) {
      refetchUsers();
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <SearchInput
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
      />

      {isLoadingUsers && <p>Loading users...</p>}
      {isErrorUsers && <p className="text-red-500">Error fetching users.</p>}
      {users ? (
        users.length > 0 ? (
          <UserList users={users} onSelect={setSelectedUser} />
        ) : (
          <p>No users found</p>
        )
      ) : null}

      {selectedUser && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">
            Repositories for {selectedUser.login}
          </h2>

          {isLoadingRepos && <p>Loading repositories...</p>}
          {isErrorRepos && (
            <p className="text-red-500">Error fetching repos.</p>
          )}
          {repos && <RepoList repos={repos} />}
        </section>
      )}
    </main>
  );
}
