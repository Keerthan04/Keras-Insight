"use client"
import { Github, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ChatComponent from "./chatcomponent";

export function Dashboard() {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/Keerthan04",
    },
    {
      icon: Instagram,
      label: "Instagram",
      href: "https://www.instagram.com/keerthan_kumar_c/",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/keerthan-kumar-c-0478a1257",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <div className="w-full">
        <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b border-gray-700 bg-gray-900 px-4">
          <h1 className="text-xl font-semibold text-[#D00000]">KerasInsight</h1>

          {/* Social Links */}
          <div className="ml-auto flex gap-2">
            {socialLinks.map((social) => (
              <Tooltip key={social.label}>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-800 text-gray-300 hover:text-[#D00000] transition-colors"
                    onClick={() => window.open(social.href, "_blank")}
                    aria-label={social.label}
                  >
                    <social.icon className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="bg-gray-800 text-white border-gray-700"
                >
                  {social.label}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </header>

        <main className="container mx-auto max-w-7xl p-2 sm:p-4">
          <ChatComponent />
        </main>
      </div>
    </div>
  );
}