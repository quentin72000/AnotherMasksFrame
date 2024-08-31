import colors from '../utils/colors';
import { UserDataReturnType } from 'frames.js';

export default function ProfileBar({ userData }: { userData: UserDataReturnType }) {
  return (
    <div tw={`flex flex-row bg-[${colors.secondaryColor}] p-0 ml-2 rounded-2xl`}>
            <div tw="flex m-2">
                <img tw="rounded-full" src={userData?.profileImage} alt="logo" width={90} height={90} />
            </div>
            <div tw="flex flex-col ml-3 mr-3 justify-center w-auto">
                <div tw={`text-[${colors.textColor}] text-4xl w-auto`}>{userData?.displayName || ""}</div>
                <div tw={`text-[${colors.textColor}] text-3xl w-auto`}>{"@" + (userData?.username || "")}</div>
            </div>
        </div>
  )
}
