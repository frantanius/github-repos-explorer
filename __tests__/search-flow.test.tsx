import React from "react";
import fetchMock from "jest-fetch-mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import HomePage from "@/app/page";
import { ReactQueryProvider } from "@/components/providers/react-query-provider";

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
        },
        {
          login: "devcat",
          id: 2,
        },
      ],
    })
  );

  render(
    <ReactQueryProvider>
      <HomePage />
    </ReactQueryProvider>
  );

  const input = screen.getByPlaceholderText("Enter username");
  const button = screen.getByRole("button", { name: /search/i });

  await userEvent.type(input, "octo");
  await userEvent.click(button);

  // Tunggu hingga hasil muncul
  expect(await screen.findByText("octocat")).toBeInTheDocument();
  expect(screen.getByText("devcat")).toBeInTheDocument();
});

test("should show repositories when user is clicked", async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      items: [
        {
          login: "octocat",
          id: 1,
        },
      ],
    })
  );

  render(
    <ReactQueryProvider>
      <HomePage />
    </ReactQueryProvider>
  );

  const input = screen.getByPlaceholderText("Enter username");
  const button = screen.getByRole("button", { name: /search/i });

  await userEvent.type(input, "octo");
  await userEvent.click(button);

  const octocatItem = await screen.findByText("octocat");

  fetchMock.mockResponseOnce(
    JSON.stringify([
      {
        id: 1,
        name: "octo-repo",
        html_url: "#",
        description: "My cool repo",
        stargazers_count: 42,
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

  const input = screen.getByPlaceholderText("Enter username");
  const button = screen.getByRole("button", { name: /search/i });

  await userEvent.type(input, "nonexistentuser");
  await userEvent.click(button);

  expect(await screen.findByText(/no users found/i)).toBeInTheDocument();
});
