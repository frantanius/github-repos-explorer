"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/lib/github";
import { Accordion } from "@/components/ui/accordion";
import { UserSkeleton } from "@/components/Skeletons";
import SearchInput from "@/components/SearchInput";
import UserAccordionItem from "@/components/UserAccordionItem";

export default function HomePage() {
  const [query, setQuery] = useState("");

  const {
    data: users,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["search-users", query],
    queryFn: () => fetchUsers(query),
    enabled: !!query, // only run if query is non-empty
  });

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery.trim());
  };

  return (
    <main className="max-w-xl mx-auto p-4 space-y-6 bg-white">
      <SearchInput onSearch={handleSearch} />

      {/* Loading Search */}
      {isLoading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <UserSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Error Search */}
      {!isLoading && isError && (
        <p className="text-red-500 text-sm" role="alert">
          Error fetching users. Please try again.
        </p>
      )}

      {/* No Result Search */}
      {!isLoading && users && users.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No users found for <strong>{query}</strong>.
        </p>
      )}

      {/* Result Search */}
      {!isLoading && users && users.length > 0 && (
        <>
          <p className="text-sm text-muted-foreground">
            Showing users for <strong>{query}</strong>
          </p>
          <Accordion type="single" collapsible className="space-y-3">
            {users.map((user) => (
              <UserAccordionItem key={user.id} user={user} />
            ))}
          </Accordion>
        </>
      )}
    </main>
  );
}
