import clsx from "clsx";
import Link from "next/link";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

interface MenuItemProps {
  activeSidebar: boolean;
  index: number;
  title?: string;
  color: string;
  icon: React.ReactNode;
  url: string;
  atualRoute: string;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  color,
  icon,
  url,
  index,
  activeSidebar,
  atualRoute,
}) => {
  const isActive = atualRoute === url;
  const classes = clsx(
    "flex gap-3 px-[0.60rem] p-2 rounded-xl transition-all duration-300",
    {
      [`glassmorphism text-white`]: isActive,
      [`text-white hover:glassmorphism hover:text-white/80`]: !isActive,
      "w-fit": title === undefined,
    }
  );

  return activeSidebar ? (
    <Link href={url} className={classes}>
      {icon}
      {title && (
        <p
          className={clsx(
            "my-auto transition-all duration-300 delay-200 overflow-hidden",
            {
              "block text-sm font-regular": activeSidebar,
              hidden: !activeSidebar,
            }
          )}
        >
          {title}
        </p>
      )}
    </Link>
  ) : (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={url} className={classes}>
            {icon}
            {title && (
              <p
                className={clsx(
                  "my-auto transition-all duration-300 delay-200 overflow-hidden",

                  {
                    "block text-sm font-regular": activeSidebar,
                    hidden: !activeSidebar,
                  }
                )}
              >
                {title}
              </p>
            )}
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-white border-none">
          {title ? title : "Logout"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default MenuItem;
