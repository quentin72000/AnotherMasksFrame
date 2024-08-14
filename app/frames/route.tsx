import { Button } from "frames.js/next";
import { frames, generateErrorFrame, generateFrame } from "./frames";
import { appURL } from "../utils";
import { fetchMasksUserInfos } from "../utils/masksUserRequests";


const handleRequest = frames(async (ctx) => {
  const buttons = [
    <Button action="post" target={{ pathname: "/" }}>
      {ctx.message ? "🖱️ Check again!" : "🖱️ Check me!"}
    </Button>,
    <Button action="link" target={"https://warpcast.com/~/compose?text=Check%20your%20$MASKS%20stats%20with%20this%20new%20frame%20by%20@quentin72000%20!&embeds[]=https://another-masks-frame.vercel.app/frames" + (ctx.message ? '/'+ ctx.message.requesterFid : '')}>
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
