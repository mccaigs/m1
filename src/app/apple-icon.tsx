/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const contentType = "image/png";
export const size = {
  height: 180,
  width: 180,
};

export default async function AppleIcon() {
  const logoData = await readFile(join(process.cwd(), "public", "logo.svg"), "base64");

  return new ImageResponse(
    (
      <div style={{ alignItems: "center", background: "#071426", display: "flex", height: "100%", justifyContent: "center", width: "100%" }}>
        <img alt="" src={`data:image/svg+xml;base64,${logoData}`} style={{ height: "31px", width: "150px" }} />
      </div>
    ),
    size,
  );
}
