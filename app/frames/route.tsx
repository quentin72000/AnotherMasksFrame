import { Button } from "frames.js/next";
import { frames, generateErrorFrame, generateFrame } from "./frames";
import { appURL } from "../utils/url";
import { fetchMasksUserInfos } from "../utils/masksUserRequests";
import colors from "../utils/colors"

import { BiDownArrowAlt } from "react-icons/bi";



const handleRequest = frames(async (ctx) => {
  const buttons = [
    <Button action="post" target={{ pathname: "/" }}>
      {ctx.message ? "🖱️ Check again!" : "🖱️ Check me!"}
    </Button>,
    <Button 
      action="link" 
      target={`https://warpcast.com/~/compose?text=Check%20your%20$MASKS%20stats%20with%20this%20new%20frame%20by%20@quentin72000%20!&embeds[]=${appURL()}/frames` 
        + (ctx.message ? '/' + (ctx.message.requesterFid + "?t=" + new Date().getTime()) : '')}
    >
      🔗 Share frame
    </Button>,
    <Button action="link" target="https://warpcast.com/quentin72000">
      🔔 Follow
    </Button>,
  ];

  if(!ctx.message) return {
    title: '$Masks Stats by quentin72000',
    image: (
      <div tw={`flex flex-col w-full h-full bg-[${colors.backgroundColor}] justify-center items-center`}>
        <div tw="flex absolute top-1 left-1 p-5">
          <img tw="" src={appURL() + "/masksLogo.png"} alt="Masks Logo" width={100} height={100} />
        </div>
        <div tw="flex flex-col items-center justify-center mb-4">
          <div tw={`flex text-[${colors.textColor}] text-6xl font-serif`} style={{fontWeight: "700px"}}>🎭 Another $Masks Stats Frame 🎭</div>

          <div tw={`flex text-[${colors.primaryColor}] text-7xl text-center mt-6`}>Check your stats by clicking bellow NOW !</div>
        </div>
        {/* <div tw={`flex text-[9rem] text-[${colors.primaryColor}]`}><BiDownArrowAlt/></div> */}


        <div tw={`font-bold absolute bottom-1 right-1 text-[${colors.secondaryColor}] text-4xl`}>Made by quentin72000</div>

      </div>
    ),
    buttons,
  };


  const message = ctx.message;
  const fid = message.requesterFid;
  const { requesterUserData } = message || {};

  const masksUser = await fetchMasksUserInfos(fid);

  if(masksUser.error) return {
    title: "$Masks Stats by quentin72000",
    image: generateErrorFrame("An error occured while fetching data"),
    buttons,
  };


  return {
    title: "$Masks Stats by quentin72000",
    image: await generateFrame(fid, requesterUserData, masksUser.userInfo, masksUser.userRank),
    buttons,
  };
});

export const GET = handleRequest;
export const POST = handleRequest;
