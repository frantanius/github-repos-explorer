import { rest, RestRequest, ResponseComposition, RestContext } from "msw";

export const handlers = [
  rest.get(
    "https://api.github.com/search/users",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      const query = req.url.searchParams.get("q");

      if (!query || query === "empty") {
        return res(ctx.status(200), ctx.json({ items: [] }));
      }

      return res(
        ctx.status(200),
        ctx.json({
          items: [
            { login: "octocat", id: 1, avatar_url: "https://avatar1.com" },
            { login: "devcat", id: 2, avatar_url: "https://avatar2.com" },
          ],
        })
      );
    }
  ),

  rest.get(
    "https://api.github.com/users/:username/repos",
    (req: RestRequest, res: ResponseComposition, ctx: RestContext) => {
      const { username } = req.params;

      if (username === "octocat") {
        return res(
          ctx.status(200),
          ctx.json([
            {
              id: 101,
              name: "octo-repo",
              html_url: "https://github.com/octocat/octo-repo",
              description: "My test repo",
              stargazers_count: 5,
              forks_count: 2,
              language: "TypeScript",
            },
          ])
        );
      }

      return res(ctx.status(404));
    }
  ),
];
