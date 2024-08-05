import { fetchMetadata } from "frames.js/next";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Frames Next.js Example",
    other: {
      ...(await fetchMetadata(
        new URL("/frames", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
      )),
    },
  };
}

export default async function Home() {
  console.info("Metadata", await generateMetadata());
  console.log("App URL", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");
  console.log("Current URL", new URL("/frames", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"));
  console.info("Frame metadata", await fetchMetadata(new URL("/frames", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")));
  console.info("Test frame metadata", await fetchMetadata(new URL("/", process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")));
  return <div>GM user data example.</div>;
}
