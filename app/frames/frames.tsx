import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { appURL } from "../utils/url";

import colors from "../utils/colors";

import { CiLock } from "react-icons/ci";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { PiDeviceRotate } from "react-icons/pi";
import BadgeBar from "../components/BadgeBar";
import ProfileBar from "../components/ProfileBar";
import StatsCircle from "../components/StatsCircle";

export const frames = createFrames({
  basePath: '/frames',
  baseUrl: appURL(),
  imagesRoute: null,
  middleware: [
    farcasterHubContext({
      ...(process.env.NODE_ENV === "production"
        ? {}
        : {
            hubHttpUrl: "http://localhost:3010/hub",
          }),
    }),
  ],
  imageRenderingOptions: async () => {
    const interRegularFont = fs.readFile(
      path.join(path.resolve(process.cwd(), "public"), "Inter-Regular.ttf")
    );

    const interBoldFont = fs.readFile(
      path.join(path.resolve(process.cwd(), "public"), "Inter-Bold.ttf")
    );

    const firaScriptFont = fs.readFile(
      path.join(
        path.resolve(process.cwd(), "public"),
        "FiraCodeiScript-Regular.ttf"
      )
    );
    const [interRegularFontData, interBoldFontData, firaScriptData] =
      await Promise.all([interRegularFont, interBoldFont, firaScriptFont]);
    return {
      imageOptions: {
        fonts: [
          {
            name: "Inter",
            data: interRegularFontData,
            weight: 400,
          },
          {
            name: "Inter",
            data: interBoldFontData,
            weight: 700,
          },
          {
            name: "Fira Code",
            data: firaScriptData,
            weight: 700,
          },
        ],
      },
    };
  },
});

export async function generateFrame(fid: number, requesterUserData: any, masksUserInfo: any, masksUserRank: any) {
  return (
    <div tw={`flex flex-col bg-[${colors.backgroundColor}] w-full h-full justify-center`}>

        <div tw="flex items-start">
          <ProfileBar userData={requesterUserData}/>
        </div>

        <div tw="flex flex-row justify-around items-center pt-3">
            <StatsCircle 
              value={masksUserInfo.masks.toString()} 
              label="Balance" 
              textSize={{ valueSize: "5xl", labelSize: "4xl" }}
              circleSize="75"
            />

            <StatsCircle 
              value={(
                <>
                  <span>{masksUserInfo.remainingAllowance.toString()}</span>
                  <span tw={`text-[${colors.accentColor}]`}> / </span>
                  <span>{masksUserInfo.weeklyAllowance.toString()}</span>
                </>
              )} 
              label="Allowance" 
              textSize={{ valueSize: "5xl", labelSize: "4xl" }}
              circleSize="85"
            />

            <StatsCircle 
              value={
                <>
                  <span tw={`text-[${colors.accentColor}]`}>#</span>
                  <span>{masksUserRank.rank.toString()}</span>
                </>
              } 
              label="Rank" 
              textSize={{ valueSize: "5xl", labelSize: "4xl" }}
              circleSize="75"
            />
        </div>

        <div tw="flex flex-row items-center justify-center mt-4">
          <BadgeBar
              badges={[
                  { content: LiaPiggyBankSolid, isActive: masksUserInfo.nftOneBonus > 0 },
                  { content: CiLock, isActive: masksUserInfo.tippingAllowed },
                  { content: PiDeviceRotate, isActive: masksUserInfo.nftTwoCashback > 0 },
              ]}
          />
        </div>

        {/* {requesterUserData?.displayName?.includes("🎭") ? "" : (
            <div tw="flex flex-row text-2xl items-center justify-center mt-3">
                <span tw={`text-[${colors.accentColor}]`}>Tip : </span>
                <span tw="text-green-500 pl-2">Wear a 🎭 in your display name for potential bonus allocation!</span>
            </div>
        )} */}
      </div>
  )
}

export function generateErrorFrame(message: string) {
  return (
    <div tw="flex flex-col bg-gray-900 w-full h-full justify-center items-center">
      <div tw="flex text-red-500 text-6xl">Sorry, something went wrong.</div>
      <div tw="flex text-red-500 text-5xl">{message}</div>
    </div>
  );
}