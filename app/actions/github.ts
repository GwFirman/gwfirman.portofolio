"use server";

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  html_url: string;
}

interface GitHubEvent {
  type: string;
  created_at: string;
  repo: {
    name: string;
  };
}

export async function getGitHubProfile() {
  const GITHUB_USERNAME = "GwFirman";

  try {
    // Fetch profile data
    const profileResponse = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    );

    if (!profileResponse.ok) {
      throw new Error("Failed to fetch GitHub profile");
    }

    const profile: GitHubProfile = await profileResponse.json();

    // Fetch recent events for last contribution
    let lastContribution = null;
    try {
      const eventsResponse = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=1`,
        {
          next: { revalidate: 3600 },
        },
      );

      if (eventsResponse.ok) {
        const eventsData: GitHubEvent[] = await eventsResponse.json();
        if (eventsData.length > 0) {
          const lastEvent = eventsData[0];
          const date = new Date(lastEvent.created_at);
          lastContribution = date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
      }
    } catch (e) {
      // Continue without last contribution if it fails
      console.error("Failed to fetch events:", e);
    }

    // Calculate account age
    const accountAge = Math.floor(
      (Date.now() - new Date(profile.created_at).getTime()) /
        (1000 * 60 * 60 * 24 * 365),
    );

    return {
      success: true,
      data: {
        name: profile.name,
        username: profile.login,
        bio: profile.bio,
        location: profile.location,
        blog: profile.blog,
        company: profile.company,
        avatar: profile.avatar_url,
        repos: profile.public_repos,
        followers: profile.followers,
        following: profile.following,
        accountAge,
        lastContribution,
        profileUrl: profile.html_url,
      },
    };
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
