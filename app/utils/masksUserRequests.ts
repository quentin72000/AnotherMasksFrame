export async function fetchMasksUserInfos(fid: number) {
    try {
        const userInfo = await fetch("https://app.masks.wtf/api/balance?fid=" + fid).then((res) => res.json());
        const userRank = await fetch("https://app.masks.wtf/api/rank?fid=" + fid).then((res) => res.json());
        if(userInfo.error || userRank.error) return { error: true };
        return { userInfo, userRank };
    } catch (error) {
        return { error: true };
    }
}