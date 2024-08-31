import { IconType } from "react-icons";
import colors from "../utils/colors";
import React from "react";

type Badge = {
    content: IconType;
    isActive: boolean;
}
type BadgeBarProps = {
    badges: Badge[];
    className?: string;
  };

export default function BadgeBar({
    badges,
    className,
} : BadgeBarProps) {
  return (
        <div tw={`flex bg-[${colors.secondaryColor}] p-4 rounded-full`}>
            {badges.map((badge, index) => (
                <div key={index} tw={`flex text-[${colors.textColor}] text-5xl bg-${badge.isActive ? "green" : "red"}-500 p-2 m-2 rounded-full`}>
                    {React.createElement(badge.content)}
                </div>
            ))}
        </div>
  )
}
