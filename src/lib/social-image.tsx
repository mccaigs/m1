/* eslint-disable @next/next/no-img-element */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const socialImageSize = {
  height: 630,
  width: 1200,
};

export async function createSocialImage() {
  const logoData = await readFile(join(process.cwd(), "public", "logo.svg"), "base64");

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#071426",
          color: "#f6f3ec",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "flex-start",
            border: "1px solid rgba(216, 239, 255, 0.18)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "56px",
            width: "100%",
          }}
        >
          <div style={{ alignItems: "center", display: "flex", gap: "20px" }}>
            <img alt="" src={`data:image/svg+xml;base64,${logoData}`} style={{ height: "84px", width: "84px" }} />
            <span style={{ fontSize: "42px", fontWeight: 700 }}>McCaigs</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <span style={{ color: "#3aa7ff", fontSize: "22px", letterSpacing: "5px", textTransform: "uppercase" }}>
              Built in Scotland
            </span>
            <span style={{ fontSize: "76px", fontWeight: 700, letterSpacing: "-4px", lineHeight: 1 }}>
              Scotland&apos;s Elite Technical Studio
            </span>
            <span style={{ color: "#d8efff", fontSize: "30px", lineHeight: 1.35 }}>
              Practical AI, automation, websites, internal systems, and digital products built properly.
            </span>
          </div>
        </div>
      </div>
    ),
    socialImageSize,
  );
}
