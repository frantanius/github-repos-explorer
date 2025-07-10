"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { GitHubUser, GitHubRepo, fetchUserRepos } from "@/lib/github";
import UserRepoList from "@/components/UserRepoList";

interface UserAccordionItemProps {
  user: GitHubUser;
}

export default function UserAccordionItem({ user }: UserAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: repositories,
    isLoading,
    isError,
    refetch,
  } = useQuery<GitHubRepo[]>({
    queryKey: ["user-repos", user.login],
    queryFn: () => fetchUserRepos(user.login),
    enabled: false, // Repos are only fetched manually when the item is expanded
  });

  /* 
    Trigger the fetch only when the accordion is opened 
    and data hasn't been fetched yet
  */
  useEffect(() => {
    if (isOpen && !repositories) {
      refetch();
    }
  }, [isOpen, refetch, repositories]);

  return (
    <AccordionItem
      value={user.login}
      className="rounded border border-gray-200"
    >
      <AccordionTrigger
        onClick={() => setIsOpen((prev) => !prev)} // Toggle open state
        className="justify-between p-3 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium cursor-pointer"
      >
        <span>{user.login}</span>
      </AccordionTrigger>
      <AccordionContent className="bg-gray-50 p-4">
        {isError ? (
          <p className="text-red-500">Error fetching repositories.</p>
        ) : (
          <UserRepoList repos={repositories ?? []} loading={isLoading} />
        )}
      </AccordionContent>
    </AccordionItem>
  );
}
