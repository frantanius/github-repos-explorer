"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const searchSchema = z.object({
  query: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(39, "Username must be at most 39 characters")
    .regex(
      /^(?!-)(?!.*--)[a-zA-Z\d-]{1,39}(?<!-)$/,
      "Only letters, numbers, and single dashes are allowed"
    ),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: { query: "" },
  });

  const handleSubmit = (data: SearchFormValues) => {
    onSearch(data.query);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-2 w-full"
      >
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter username"
                  aria-label="GitHub username"
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid || form.formState.isSubmitting}
          size="lg"
          fullWidth
        >
          Search
        </Button>
      </form>
    </Form>
  );
}
