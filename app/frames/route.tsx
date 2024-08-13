import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";
import { appURL } from "../utils";
import { CiLock } from "react-icons/ci";
import { LiaPiggyBankSolid } from "react-icons/lia";
import { PiDeviceRotate } from "react-icons/pi";

import colors from "../utils/colors";


const handleRequest = frames(async (ctx) => {
  
  const buttons = [
    <Button action="post" target={{ pathname: "/" }}>
      {ctx.message ? "🖱️ Check again!" : "🖱️ Check me!"}
    </Button>,
    <Button action="link" target={"https://warpcast.com/~/compose?text=Check%20your%20$MASKS%20stats%20with%20this%20new%20frame%20by%20@quentin72000%20!&embeds[]=https://another-masks-frame.vercel.app/frames"}>
      🔗 Share frame
    </Button>,
    <Button action="link" target="https://warpcast.com/quentin72000">
      🔔 Follow
    </Button>,
  ];

  if(!ctx.message) return {
    title: '$Masks Stats by quentin72000',
    image: (
      <div tw="flex flex-col w-full h-full bg-zinc-900  text-7xl">
        <div tw="flex p-5">
          <img tw="" src={appURL() + "/masksLogo.png"} alt="Masks Logo" width={100} height={100} />
        </div>
        <div tw="flex flex-col items-center justify-center">
          <div tw="flex text-gray-500"><p tw="font-serif" style={{fontWeight: "700px"}}>🎭 $Masks Stats Frame 🎭</p></div>
          <div tw="font-bold">By quentin72000</div>
        </div>
      </div>
    ),
    buttons,
  };


  const message = ctx.message;
  const { requesterUserData } = message || {};

  const masksUserInfo = await fetch("https://app.masks.wtf/api/balance?fid=" + ctx.message.requesterFid).then((res) => res.json());
  const masksUserRank = await fetch("https://app.masks.wtf/api/rank?fid=" + ctx.message.requesterFid).then((res) => res.json());

  // masksUserInfo.weeklyAllowance = 100_000;
  // masksUserInfo.remainingAllowance = 100_000; 


  if(masksUserInfo.error || masksUserRank.error) return {
    title: "$Masks Stats by quentin72000",
    image: <div>An error occurred.</div>,
  };


  return {
    title: "$Masks Stats by quentin72000",
    image: (
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
    ),
    buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
