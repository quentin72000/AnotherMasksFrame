import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { appURL } from "../utils";

import colors from "../utils/colors";

import { CiLock } from "react-icons/ci";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { PiDeviceRotate } from "react-icons/pi";

export const frames = createFrames({
  basePath: '/frames',
  baseUrl: appURL(),
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
        <div tw={`flex flex-row justify-start bg-[${colors.secondaryColor}] p-0 ml-2 items-center rounded-2xl w-150`}>
            <div tw="flex m-2">
                <img tw="rounded-full" src={requesterUserData?.profileImage} alt="logo" width={90} height={90} />
            </div>
            <div tw="flex flex-col ml-3 mr-3 justify-center w-auto">
                <div tw={`text-[${colors.textColor}] text-4xl w-auto`}>{requesterUserData?.displayName || ""}</div>
                <div tw={`text-[${colors.textColor}] text-3xl w-auto`}>{"@" + (requesterUserData?.username || "")}</div>
            </div>
        </div>

        <div tw="flex flex-row justify-around items-center pt-3">

            <div tw={`flex flex-col items-center justify-center bg-[${colors.primaryColor}] min-w-75 min-h-75 rounded-full shadow-2xl shadow-blue-800`}>
                <div tw={`flex text-[${colors.textColor}] text-center text-5xl p-2`}>{masksUserInfo.masks.toString()}</div>
                <div tw={`text-[${colors.textColor}] text-center text-4xl pt-2`}>Balance</div>
            </div>

            <div tw={`flex flex-col items-center justify-center bg-[${colors.primaryColor}] min-w-85 min-h-85 rounded-full shadow-2xl shadow-blue-800`}>
                <div tw={`flex text-[${colors.textColor}] text-center text-5xl p-2`}>
                    <span>{masksUserInfo.remainingAllowance.toString()}</span>
                    <span tw={`text-[${colors.accentColor}]`}> / </span>
                    <span>{masksUserInfo.weeklyAllowance.toString()}</span>
                </div>
                <div tw={`text-[${colors.textColor}] text-center text-4xl pt-2`}>Allowance</div>
            </div>

            <div tw={`flex flex-col items-center justify-center bg-[${colors.primaryColor}] min-w-75 min-h-75 rounded-full shadow-2xl shadow-blue-800`}>
                <div tw={`flex flex-row text-[${colors.textColor}] text-center text-5xl p-2`}>
                    <span tw={`text-[${colors.accentColor}]`}>#</span>
                    <span>{masksUserRank.rank.toString()}</span>
                </div>
                <div tw={`text-[${colors.textColor}] text-center text-4xl pt-2`}>Rank</div>
            </div>
        </div>
        
        <div id="badges" tw="flex flex-row items-center justify-center mt-4">
          <div tw={`flex bg-[${colors.secondaryColor}] p-4 rounded-full`}>
            <div tw={`flex text-[${colors.textColor}] text-5xl bg-${masksUserInfo.nftOneBonus > 0 ? "green" : "red"}-500 p-2 m-2 rounded-full`}>
              <LiaPiggyBankSolid/>
            </div>
            <div tw={`flex text-[${colors.textColor}] text-5xl bg-${masksUserInfo.tippingAllowed ? "green" : "red"}-500 p-2 m-2 rounded-full`}>
              <CiLock/>
            </div>
            <div tw={`flex text-[${colors.textColor}] text-5xl bg-${masksUserInfo.nftTwoCashback > 0 ? "green" : "red"}-500 p-2 m-2 rounded-full`}>
              <PiDeviceRotate/>
            </div>
          </div>
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