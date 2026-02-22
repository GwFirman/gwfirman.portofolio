"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  GitBranch,
  Star,
  Users,
  BookOpen,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Github,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  blog: string;
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

export default function GitHubSection() {
  const [profile, setProfile] = useState<GitHubProfile | null>(null);
  const [lastContribution, setLastContribution] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const GITHUB_USERNAME = "GwFirman";

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch profile data
        const profileResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}`
        );
        if (!profileResponse.ok) {
          throw new Error("Failed to fetch GitHub profile");
        }
        const profileData = await profileResponse.json();
        setProfile(profileData);

        // Fetch recent events for last contribution
        const eventsResponse = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=1`
        );
        if (eventsResponse.ok) {
          const eventsData: GitHubEvent[] = await eventsResponse.json();
          if (eventsData.length > 0) {
            const lastEvent = eventsData[0];
            const date = new Date(lastEvent.created_at);
            setLastContribution(date.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }));
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchGitHubData();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <Skeleton className="w-32 h-32 rounded-full" />
                <div className="flex-1 space-y-4">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <CardContent className="p-6 text-center">
              <p className="text-red-600 dark:text-red-400">
                {error || "Failed to load GitHub profile"}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const accountAge = Math.floor(
    (Date.now() - new Date(profile.created_at).getTime()) /
      (1000 * 60 * 60 * 24 * 365)
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            GitHub Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            My open source contributions and activity
          </p>
        </div>

        {/* Main Profile Card */}
        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-gray-200 dark:border-gray-800 shadow-xl">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 mb-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="w-32 h-32 border-4 border-purple-500">
                  <AvatarImage src={profile.avatar_url} alt={profile.name} />
                  <AvatarFallback>{profile.name?.charAt(0) || "G"}</AvatarFallback>
                </Avatar>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold mb-1 text-gray-900 dark:text-white">
                  {profile.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-3">
                  @{profile.login}
                </p>
                {profile.bio && (
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {profile.bio}
                  </p>
                )}

                {/* Meta Info */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {profile.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.blog && (
                    <div className="flex items-center gap-1">
                      <LinkIcon className="w-4 h-4" />
                      <a
                        href={profile.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                      >
                        {profile.blog.replace(/^https?:\/\//, "")}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Visit GitHub Profile
                  </a>
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.public_repos}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Repositories
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.followers}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Followers
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <GitBranch className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {profile.following}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Following
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {accountAge}+
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Years Active
                </div>
              </div>
            </div>

            {/* Last Contribution */}
            {lastContribution && (
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Star className="w-4 h-4" />
                  <span>Last contribution: {lastContribution}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
