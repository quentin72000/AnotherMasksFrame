import { createFrames, Button } from "frames.js/next";
import { frames } from "./frames";
import { appURL } from "../utils";

const handleRequest = frames(async (ctx) => {
  
  const buttons = [
    <Button action="post" target={{ pathname: "/" }}>
      🖱️ Check me!
    </Button>,
    <Button action="link" target={""}>
      🔗 Share
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

  if(masksUserInfo.error || masksUserRank.error) return {
    title: "$Masks Stats by quentin72000",
    image: <div>An error occurred.</div>,
  };

  return {
    title: "$Masks Stats by quentin72000",
    image: (
      <div tw="flex flex-col bg-zinc-900  w-full h-full justify-center">
        <div  tw="flex flex-row justify-start">
          <div tw="flex flex-col m-5">
            <img tw="rounded-full " src={requesterUserData?.profileImage} alt="logo" width={100} height={100}/>
          </div>
          <div tw="flex flex-col p-3 justify-center">
            <div tw="text-white text-4xl">{requesterUserData?.displayName || ""}</div>
            <div tw="text-white text-2xl">{"@" + (requesterUserData?.username || "")}</div>
          </div>
        </div>

        <div tw="flex flex-row justify-center items-center">
          <div tw="flex flex-col m-10 p-10 items-center justify-center bg-black min-w-75 min-h-75 rounded-full shadow-2xl shadow-gray-800">
            <div tw="flex text-white text-center text-5xl">{masksUserInfo.masks.toString()}</div>
            <div tw="text-white text-center text-4xl pt-2">Balance</div>
          </div>

          <div tw="flex flex-col m-10 p-10 items-center justify-center bg-black min-w-75 min-h-75 rounded-full shadow-2xl shadow-gray-800">
            <div tw="flex text-white text-center text-4xl">
              <span>{masksUserInfo.remainingAllowance.toString()}</span>
              <span tw="text-gray-500"> / </span>
              <span>{masksUserInfo.weeklyAllowance.toString()}</span>
            </div>
            <div tw="text-white text-center text-4xl pt-2">Allowance</div>
          </div>

          <div tw="flex flex-col m-10 p-10 items-center justify-center bg-black min-w-75 min-h-75 rounded-full shadow-2xl shadow-gray-800">
            <div tw="flex flex-row text-white text-center text-5xl">
              <span tw="text-gray-500">#</span>
              <span>{masksUserRank.rank.toString()}</span>
              </div>
            <div tw="text-white text-center text-4xl pt-2">Rank</div>
          </div>
        </div>

        {requesterUserData?.displayName?.includes("🎭") && false ? "" : <div tw="flex flex-row text-2xl items-center justify-center">
            <span tw="text-gray-400">Tip : </span> <span tw='text-green-500 pl-2'>Wear a 🎭 in your display name for potential bonus allocation!</span>
          </div>
        }
      </div>
    ),
    buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
