"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchInput({
  query,
  onQueryChange,
  onSearch,
}: SearchInputProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search GitHub username"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
      />
      <Button onClick={onSearch}>Search</Button>
    </div>
  );
}
