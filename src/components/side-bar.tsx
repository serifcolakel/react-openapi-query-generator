import {
  Bot,
  Dot,
  HighlighterIcon,
  LayoutDashboard,
  LifeBuoy,
  SquareUser,
  Triangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import { paths } from "@/common/paths";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";

const links = [
  {
    icon: <LayoutDashboard className="size-5" />,
    label: "Dashboard",
    path: paths.dashboard,
    description: "Manage your projects and models",
  },
  { icon: <Bot className="size-5" />, label: "Models", path: paths.home },
  {
    icon: <HighlighterIcon className="size-5" />,
    label: "Highlight",
    path: paths.highLight,
    description: "Annotate and highlight text",
  },
];

export default function SideBar() {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  return (
    <aside className="fixed left-0 z-20 flex flex-col h-full border-r inset-y">
      <div className="p-2 border-b">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="grid gap-1 p-2">
        {links.map(({ icon, label, path, description }) => (
          <Tooltip key={label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("rounded-lg", {
                  "bg-muted": pathName === path,
                })}
                aria-label={label}
                onClick={() => navigate(path)}
              >
                {icon}
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="right"
              className="flex flex-col"
              sideOffset={5}
            >
              <Label className="text-center text-white dark:text-gray-500">
                {label}
              </Label>
              {description && (
                <Label className="flex flex-row items-center text-xs text-white dark:text-gray-500">
                  <Dot />
                  {description}
                </Label>
              )}
            </TooltipContent>
          </Tooltip>
        ))}
      </nav>
      <nav className="grid gap-1 p-2 mt-auto">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Help"
            >
              <LifeBuoy className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Help
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="mt-auto rounded-lg"
              aria-label="Account"
            >
              <SquareUser className="size-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={5}>
            Account
          </TooltipContent>
        </Tooltip>
      </nav>
    </aside>
  );
}
