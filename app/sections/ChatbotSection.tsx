"use client";
import { useState, useRef } from "react";
import { getChatResponse } from "@/app/actions/chat"; // Updated import
import {
  Send,
  Award,
  Briefcase,
  BookOpen,
  Zap,
  ExternalLink,
  ChevronUp,
  ChevronsLeftRight,
  ChevronsRightLeft,
  ChevronDown,
  Github,
  MapPin,
  Link as LinkIcon,
  Users,
  GitBranch,
  Calendar,
  Book,
  CalendarClock,
  UserRoundCheck,
  Mail,
  Linkedin,
  Globe,
} from "lucide-react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";

interface GitHubProfile {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  repos: number;
  followers: number;
  following: number;
  accountAge: number;
  lastContribution: string;
  profileUrl: string;
  location: string;
  blog: string;
}

interface BusinessCard {
  name: string;
  role: string;
  email: string;
  location: string;
  socials: Array<{ label: string; url: string; icon?: string }>;
}

interface BotResponse {
  text: string;
  links?: Array<{ label: string; url: string }>;
  image?: string;
  githubProfile?: GitHubProfile;
  showBusinessCard?: boolean;
  businessCard?: BusinessCard;
}

interface ChatMessage {
  type: "user" | "bot";
  text: string;
  links?: Array<{ label: string; url: string }>;
  image?: string;
  githubProfile?: GitHubProfile;
  showBusinessCard?: boolean;
  businessCard?: BusinessCard;
}

export default function ChatbotSection() {
  const [message, setMessage] = useState("");
  const chatbotRef = useRef<HTMLDivElement>(null);
  const [currentMessage, setCurrentMessage] = useState<ChatMessage | null>(
    null,
  );
  const [currentResponse, setCurrentResponse] = useState<ChatMessage | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(!currentResponse); // Auto collapse jika belum ada jawaban
  const [textareaHeight, setTextareaHeight] = useState("auto");

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);

    // Reset height to auto to get correct scrollHeight
    e.target.style.height = "auto";

    // Calculate new height - max 5 lines (assume ~24px per line)
    const newHeight = Math.min(e.target.scrollHeight, 24 * 5);
    setTextareaHeight(`${newHeight}px`);
  };

  // Replaced static getResponse with async call to Gemini
  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMsg = message.trim();

      // Trigger fade out if there's already a response
      if (currentResponse) {
        setFadeOut(true);
        // Wait for fade out animation
        await new Promise((resolve) => setTimeout(resolve, 300));

        setCurrentMessage({ type: "user", text: userMsg });
        setCurrentResponse(null);
        setFadeOut(false);
        setMessage("");
        setLoading(true);
        setIsCollapsed(false);
      } else {
        setCurrentMessage({ type: "user", text: userMsg });
        setMessage("");
        setLoading(true);
        setIsCollapsed(false);
      }

      // Scroll to view after state update (so the component has expanded)
      setTimeout(() => {
        if (chatbotRef.current) {
          chatbotRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);

      try {
        const botResponse = await getChatResponse(userMsg);
        setCurrentResponse({
          type: "bot",
          text: botResponse.text,
          links: botResponse.links,
          image: botResponse.image,
          githubProfile: botResponse.githubProfile,
          showBusinessCard: botResponse.showBusinessCard,
          businessCard: botResponse.businessCard,
        });
      } catch (error) {
        console.error("Error fetching response:", error);
        setCurrentResponse({
          type: "bot",
          text: "Sorry, something went wrong. Please try again.",
          links: [],
        });
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div
      ref={chatbotRef}
      className="flex flex-col bg-white dark:bg-gray-900/30 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden scroll-mt-32 font-mono-nl"
    >
      {/* Display Area Header with Collapse Button - Only show when there's a message */}
      <div className="flex items-center justify-between dark:bg-gray-900 px-6 py-3">
        <h3 className="text-sm font-semibold  text-gray-900 dark:text-gray-100">
          Ask About me
        </h3>
        {currentMessage && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            title={isCollapsed ? "Expand" : "Collapse"}
          >
            {isCollapsed ? (
              <ChevronsLeftRight size={18} className="rotate-45" />
            ) : (
              <ChevronsRightLeft size={18} className="rotate-45" />
            )}
          </button>
        )}
      </div>

      {/* Display Area - Only show when there's current message and not collapsed */}
      {currentMessage && !isCollapsed && (
        <div
          className={`flex-1 overflow-y-auto p-6 space-y-4 max-h-[35vh] sm:max-h-[420px] transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}
        >
          {/* User Message */}
          <div className="flex justify-end">
            <div className="max-w-xs bg-blue-500 dark:bg-blue-950 text-white rounded-2xl rounded-tr-none px-4 py-3">
              <p className="text-sm">{currentMessage.text}</p>
            </div>
          </div>

          {/* Bot Response */}
          {currentResponse && (
            <div className="flex justify-start">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 ">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/pasfotobg.png"
                      alt="Firman"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    Firman
                  </p>
                </div>
                <div className="rounded-2xl rounded-tl-none px-4 py-2 ml-7">
                  {/* GitHub Profile Card */}
                  {currentResponse.githubProfile && (
                    <div className="mb-3 bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
                          <Image
                            src={currentResponse.githubProfile.avatar}
                            alt={currentResponse.githubProfile.name}
                            fill
                            className="rounded-full object-cover border-2"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm sm:text-base font-bold text-gray-900 mb-0.5">
                            {currentResponse.githubProfile.name} | @
                            {currentResponse.githubProfile.username}
                          </h4>
                          {currentResponse.githubProfile.bio &&
                            currentResponse.githubProfile.bio !== "N/A" && (
                              <p className="text-xs text-gray-700 mb-2 line-clamp-2 sm:line-clamp-none">
                                {currentResponse.githubProfile.bio}
                              </p>
                            )}
                          <div className="flex">
                            {/* Details Profile - Stats */}
                            <div className="flex-1 sm:w-auto sm:flex-1 sm:min-w-0 grid grid-cols-3 sm:flex sm:flex-col gap-2 ">
                              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-0.5 sm:gap-1">
                                <Book className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 flex-shrink-0" />
                                <h4 className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                                  <span className="font-semibold sm:font-normal">
                                    {currentResponse.githubProfile.repos}
                                  </span>
                                  <span className="hidden sm:inline">
                                    {" "}
                                    Repository
                                  </span>
                                  <span className="block sm:hidden text-[10px]">
                                    Repos
                                  </span>
                                </h4>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-0.5 sm:gap-1">
                                <CalendarClock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 flex-shrink-0" />
                                <h4 className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                                  <span className="font-semibold sm:font-normal">
                                    {currentResponse.githubProfile.accountAge}+
                                  </span>
                                  <span className="hidden sm:inline">
                                    {" "}
                                    Years
                                  </span>
                                  <span className="block sm:hidden text-[10px]">
                                    Years
                                  </span>
                                </h4>
                              </div>
                              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-0.5 sm:gap-1">
                                <UserRoundCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-700 flex-shrink-0" />
                                <h4 className="text-xs sm:text-sm text-gray-600 text-center sm:text-left">
                                  <span className="font-semibold sm:font-normal">
                                    {currentResponse.githubProfile.followers}
                                  </span>
                                  <span className="hidden sm:inline">
                                    {" "}
                                    Followers
                                  </span>
                                  <span className="block sm:hidden text-[10px]">
                                    Follow
                                  </span>
                                </h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Last Contribution */}
                      {currentResponse.githubProfile.lastContribution &&
                        currentResponse.githubProfile.lastContribution !==
                          "N/A" && (
                          <div className="text-[10px] sm:text-xs text-gray-600 text-center border-gray-200 pt-2 border-t">
                            Last contribution:{" "}
                            {currentResponse.githubProfile.lastContribution}
                          </div>
                        )}
                    </div>
                  )}

                  {/* Project Image */}
                  {currentResponse.image && (
                    <div className="mb-3 relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                      <Image
                        src={currentResponse.image}
                        alt="Project Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}

                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-3 prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => (
                          <p className="mb-2 last:mb-0 leading-relaxed dark:text-gray-300">
                            {children}
                          </p>
                        ),
                        ul: ({ children }) => (
                          <ul className="list-disc ml-4 mb-2">{children}</ul>
                        ),
                        ol: ({ children }) => (
                          <ol className="list-decimal ml-4 mb-2">{children}</ol>
                        ),
                        li: ({ children }) => (
                          <li className="mb-1">{children}</li>
                        ),
                        strong: ({ children }) => (
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {children}
                          </span>
                        ),
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {currentResponse.text}
                    </ReactMarkdown>
                  </div>

                  {/* Business Card - After Text Response */}
                  {currentResponse.showBusinessCard &&
                    currentResponse.businessCard && (
                      <div className="mb-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-4 sm:p-6 ">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4 pb-4 border-b border-gray-300 dark:border-gray-700">
                          <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                            <Image
                              src="/images/pasfotobg.png"
                              alt={currentResponse.businessCard.name}
                              fill
                              className="rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-md"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3">
                              {currentResponse.businessCard.name}
                            </h3>
                            <div className="flex flex-wrap gap-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                              <div className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-gray-700 dark:text-gray-300" />
                                <span>
                                  {currentResponse.businessCard.location}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 text-gray-700 dark:text-gray-300" />
                                <a
                                  href={`mailto:${currentResponse.businessCard.email}`}
                                  className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors truncate text-gray-700 dark:text-gray-200"
                                >
                                  {currentResponse.businessCard.email}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-2">
                          <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">
                            Connect with me:
                          </p>
                          <div className="grid grid-cols-2 gap-2">
                            {currentResponse.businessCard.socials.map(
                              (social, idx) => {
                                const getIcon = (iconName?: string) => {
                                  const baseIconClass =
                                    "w-4 h-4 text-gray-700 dark:text-gray-200";
                                  switch (iconName) {
                                    case "github":
                                      return (
                                        <Github className={baseIconClass} />
                                      );
                                    case "linkedin":
                                      return (
                                        <Linkedin className={baseIconClass} />
                                      );
                                    case "email":
                                      return <Mail className={baseIconClass} />;
                                    case "web":
                                      return (
                                        <Globe className={baseIconClass} />
                                      );
                                    default:
                                      return (
                                        <ExternalLink
                                          className={baseIconClass}
                                        />
                                      );
                                  }
                                };

                                const isEmail =
                                  social.url.startsWith("mailto:");

                                return (
                                  <a
                                    key={idx}
                                    href={social.url}
                                    target={isEmail ? "_self" : "_blank"}
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-transparent transition-all duration-200 shadow-sm hover:shadow-md group"
                                  >
                                    <span className="flex-shrink-0 group-hover:scale-110 transition-transform">
                                      {getIcon(social.icon)}
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium truncate">
                                      {social.label}
                                    </span>
                                  </a>
                                );
                              },
                            )}
                          </div>
                        </div>

                        {/* CTA Badge */}
                        <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-700 text-center">
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            💼 Available for collaborations and opportunities
                          </p>
                        </div>
                      </div>
                    )}

                  {/* Links Badge */}
                  {currentResponse.links &&
                    currentResponse.links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {currentResponse.links.map(
                          (
                            link: { label: string; url: string },
                            linkIdx: number,
                          ) => {
                            // Check if it's an email link for special styling
                            const isEmailLink = link.url.startsWith("mailto:");

                            return (
                              <a
                                key={linkIdx}
                                href={link.url}
                                target={isEmailLink ? "_self" : "_blank"}
                                rel="noopener noreferrer"
                                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                                  isEmailLink
                                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md hover:shadow-lg"
                                    : "bg-white dark:text-white dark:bg-gray-900 border border-blue-200 text-blue-600 hover:bg-blue-500 hover:text-white hover:border-blue-500"
                                }`}
                              >
                                {link.label}
                                {!isEmailLink && <ExternalLink size={12} />}
                              </a>
                            );
                          },
                        )}
                      </div>
                    )}
                </div>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="flex justify-start">
              <div className="max-w-2xl w-full">
                {/* Avatar + name skeleton */}
                <div className="flex items-center gap-3 mb-2">
                  <div className="relative w-8 h-8 flex-shrink-0">
                    <Image
                      src="/images/pasfotobg.png"
                      alt="Firman"
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
                    Firman
                  </p>
                </div>
                {/* Bubble skeleton */}
                <div className="rounded-2xl rounded-tl-none px-4 py-4 ml-7 space-y-2.5">
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-full" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-[85%]" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-[70%]" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-[90%]" />
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse w-[55%]" />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white px-6 dark:bg-gray-950 pb-4">
        {/* Textarea Input */}
        <div className="relative mb-3">
          <textarea
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.ctrlKey) {
                handleSendMessage();
              }
            }}
            placeholder={
              typeof window !== "undefined" &&
              window.matchMedia &&
              window.matchMedia("(max-width: 639px)").matches
                ? "just ask my assistant what you need to know..."
                : "In a rush? Let's skip the scrolling—just ask my assistant what you need to know..."
            }
            className="w-full py-3 pr-12 rounded-xl focus:outline-none text-sm resize-none overflow-y-auto bg-transparent text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            style={{
              height: textareaHeight || "40px",
              minHeight: "40px",
              maxHeight: "120px",
            }}
            disabled={loading}
          />
        </div>

        {/* Suggestions and Send Button Container */}
        <div className="flex items-center justify-between gap-2">
          {/* Suggestions */}
          <div className="flex flex-wrap gap-1 sm:gap-2 flex-1">
            {[
              {
                label: "Skills",
                icon: Zap,
                message: "What skills do you have?",
              },
              {
                label: "Achievement",
                icon: Award,
                message: "What are your achievements?",
              },
              {
                label: "Experience",
                icon: Briefcase,
                message: "Tell me about your experience",
              },
              {
                label: "Projects",
                icon: BookOpen,
                message: "What projects have you worked on?",
              },
            ].map((suggestion, idx) => {
              const IconComponent = suggestion.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setMessage(suggestion.message);
                  }}
                  disabled={loading}
                  className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs rounded-full bg-gray-100 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/30 disabled:opacity-50 border border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 whitespace-nowrap"
                  title={suggestion.label}
                >
                  <IconComponent size={14} />
                  <span className="hidden sm:inline">{suggestion.label}</span>
                </button>
              );
            })}
          </div>

          {/* Send Button */}
          <div className="border border-gray-200 dark:border-gray-700 dark:bg-gray-900 p-1 rounded-xl">
            <button
              onClick={handleSendMessage}
              disabled={loading || !message.trim()}
              aria-label="Send message"
              className={`flex-shrink-0 p-2 rounded-lg transition-all duration-200 flex items-center justify-center shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${
                loading || !message.trim()
                  ? "bg-gray-500 text-white cursor-not-allowed dark:bg-gray-700"
                  : "bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-800 dark:hover:bg-blue-900"
              }`}
              title="Send message"
            >
              {loading ? (
                <Send size={18} className="opacity-50" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
