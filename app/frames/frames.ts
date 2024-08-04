import { farcasterHubContext } from "frames.js/middleware";
import { createFrames, Button } from "frames.js/next";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { appURL } from "../utils";

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