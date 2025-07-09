import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import HomePage from "@/app/page";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";
import fetchMock from "jest-fetch-mock";

// Aktifkan fetch mock
beforeAll(() => {
  fetchMock.enableMocks();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

test("should search and show users", async () => {
  // Mock API response untuk fetchUsers
  fetchMock.mockResponseOnce(
    JSON.stringify({
      items: [
        {
          login: "octocat",
          id: 1,
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        },
        {
          login: "devcat",
          id: 2,
          avatar_url: "https://avatars.githubusercontent.com/u/2?v=4",
        },
      ],
    })
  );

  render(
    <ReactQueryProvider>
      <HomePage />
    </ReactQueryProvider>
  );

  const input = screen.getByPlaceholderText("Search GitHub username");
  const button = screen.getByRole("button", { name: /search/i });

  await userEvent.type(input, "octo");
  await userEvent.click(button);

  // Tunggu hingga hasil muncul
  expect(await screen.findByText("octocat")).toBeInTheDocument();
  expect(screen.getByText("devcat")).toBeInTheDocument();
});

test("should show repositories when user is clicked", async () => {
  // Step 1: mock fetchUsers
  fetchMock.mockResponseOnce(
    JSON.stringify({
      items: [
        {
          login: "octocat",
          id: 1,
          avatar_url: "https://avatars.githubusercontent.com/u/1?v=4",
        },
      ],
    })
  );

  render(
    <ReactQueryProvider>
      <HomePage />
    </ReactQueryProvider>
  );

  const input = screen.getByPlaceholderText("Search GitHub username");
  const button = screen.getByRole("button", { name: /search/i });

  await userEvent.type(input, "octo");
  await userEvent.click(button);

  const octocatItem = await screen.findByText("octocat");

  // Step 2: mock fetchUserRepos (dipanggil saat user diklik)
  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        name: "octo-repo",
        html_url: "#",
        description: "My cool repo",
        stargazers_count: 42,
        forks_count: 7,
        language: "TypeScript",
      },
    ])
  );

  await userEvent.click(octocatItem);

  expect(await screen.findByText("octo-repo")).toBeInTheDocument();
});

test("should handle no users found", async () => {
  // Mock empty result
  fetchMock.mockResponseOnce(JSON.stringify({ items: [] }));

  render(
    <ReactQueryProvider>
      <HomePage />
    </ReactQueryProvider>
  );

  const input = screen.getByPlaceholderText("Search GitHub username");
  const button = screen.getByRole("button", { name: /search/i });

  await userEvent.type(input, "nonexistentuser");
  await userEvent.click(button);

  expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
});
