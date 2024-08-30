import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";


let metadata: any = null;
export async function generateMetadata(): Promise<Metadata> {
  if (!metadata) {
    metadata = await fetchMetadata(
      new URL("/frames", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
    );
    console.log("Metadata cached !");
  }
  return {
    title: "$Masks Stats by quentin72000",
    other: {
      ...metadata,
    },
  };
}

export default async function Home() {
  return <div className="">
    {/* Main page html content */}
  </div>;
}
