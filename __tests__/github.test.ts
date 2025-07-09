import { fetchUsers, fetchUserRepos } from "@/lib/github";

beforeAll(() => {
  fetchMock.doMock();
});

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("GitHub API", () => {
  it("should fetch users successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        items: [{ login: "octocat", id: 1, avatar_url: "https://avatar" }],
      })
    );

    const users = await fetchUsers("octo");
    expect(users).toHaveLength(1);
    expect(users[0].login).toBe("octocat");
  });

  it("should fetch repos successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify([
        {
          id: 1,
          name: "repo1",
          html_url: "#",
          description: "",
          stargazers_count: 5,
          forks_count: 2,
          language: "JS",
        },
      ])
    );

    const repos = await fetchUserRepos("octocat");
    expect(repos).toHaveLength(1);
    expect(repos[0].name).toBe("repo1");
  });

  it("should throw error when users fetch fails", async () => {
    fetchMock.mockRejectOnce(new Error("Error fetching users: Bad Request"));

    await expect(fetchUsers("octo")).rejects.toThrow(
      "Error fetching users: Bad Request"
    );
  });

  it("should throw error when repos fetch fails", async () => {
    fetchMock.mockRejectOnce(
      new Error("Error fetching repositories for unknown: Not Found")
    );

    await expect(fetchUserRepos("unknown")).rejects.toThrow(
      "Error fetching repositories for unknown: Not Found"
    );
  });
});
