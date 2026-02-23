"use server";

export interface ContributionDay {
  date: string;
  contributionCount: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: ContributionDay[];
}

export interface ContributionData {
  weeks: ContributionWeek[];
  totalContributions: number;
}

function getLevel(count: number): 0 | 1 | 2 | 3 | 4 {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

export async function getGitHubContributions(
  username: string,
): Promise<ContributionData> {
  const token = process.env.GITHUB_TOKEN;

  if (!token || token === "your_github_token_here") {
    throw new Error("GITHUB_TOKEN is not set");
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message || "GitHub GraphQL error");
  }

  const calendar =
    json.data?.user?.contributionsCollection?.contributionCalendar;

  if (!calendar) {
    throw new Error("No contribution data found");
  }

  const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };

  const weeks: ContributionWeek[] = calendar.weeks.map((week: any) => ({
    days: week.contributionDays.map((day: any) => ({
      date: day.date,
      contributionCount: day.contributionCount,
      level: levelMap[day.contributionLevel] ?? getLevel(day.contributionCount),
    })),
  }));

  return {
    weeks,
    totalContributions: calendar.totalContributions,
  };
}
