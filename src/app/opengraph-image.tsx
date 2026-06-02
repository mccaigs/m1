import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "McCaigs - Scotland's Elite Technical Studio";
export const contentType = "image/png";
export const size = socialImageSize;

export default function OpenGraphImage() {
  return createSocialImage();
}
