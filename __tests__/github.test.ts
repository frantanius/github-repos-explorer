import { fetchUsers, fetchUserRepos } from "@/lib/github";

global.fetch = jest.fn();

describe("GitHub API", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should fetch users successfully", async () => {
    const mockUsers = {
      items: [{ login: "octocat", id: 1, avatar_url: "https://avatar" }],
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockUsers,
    });

    const users = await fetchUsers("octo");
    expect(users).toHaveLength(1);
    expect(users[0].login).toBe("octocat");
  });

  it("should fetch repos successfully", async () => {
    const mockRepos = [
      {
        id: 1,
        name: "repo1",
        html_url: "#",
        description: "",
        stargazers_count: 5,
        forks_count: 2,
        language: "JS",
      },
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRepos,
    });

    const repos = await fetchUserRepos("octocat");
    expect(repos).toHaveLength(1);
    expect(repos[0].name).toBe("repo1");
  });

  it("should throw error when users fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Bad Request",
    });

    await expect(fetchUsers("octo")).rejects.toThrow(
      "Error fetching users: Bad Request"
    );
  });

  it("should throw error when repos fetch fails", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      statusText: "Not Found",
    });

    await expect(fetchUserRepos("unknown")).rejects.toThrow(
      "Error fetching repositories for unknown: Not Found"
    );
  });
});
