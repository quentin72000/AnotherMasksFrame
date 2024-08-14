import { NextRequest } from "next/server";
import { frames, generateErrorFrame, generateFrame } from "../frames";
import { Button } from "frames.js/next";
import { getUserDataForFid } from "frames.js"
import { fetchMasksUserInfos } from "@/app/utils/masksUserRequests";

const handler = async (
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  

  return await frames(async (ctx) => {

    const buttons = [
      <Button action="post" target={{ pathname: "/" }}>
        🖱️ Check me!
      </Button>,
      <Button action="link" target="https://warpcast.com/quentin72000">
        🔔 Follow
      </Button>,
    ];
    
    if(!id || isNaN(Number(id))) return {
      title: '$Masks Stats by quentin72000',
      image: generateErrorFrame("Invalid FID"),
      buttons,
    };
  
    const fid = Number(id);
    const requesterUserData = await getUserDataForFid({fid});
    
    if(!requesterUserData) return {
      title: '$Masks Stats by quentin72000',
      image: generateErrorFrame("User not found"),
      buttons,
    };

    const masksUser = await fetchMasksUserInfos(fid);

    if(masksUser.error) return {
      title: "$Masks Stats by quentin72000",
      image: generateErrorFrame("An error occured while fetching data"),
      buttons,
    };
    
      return {
        title: '$Masks Stats by quentin72000',
        image: await generateFrame(fid, requesterUserData, masksUser.userInfo, masksUser.userRank),
        buttons: buttons,
      }
    })(req);
};

export const GET = handler;
export const POST = handler;