import fs from "fs";
import { FALL_BACK_IMG_PATH, Props } from "./constants";
import path from "path";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const fallbackImagePath = FALL_BACK_IMG_PATH;

export const ServerImage = async ({
  src,
  alt,
  fallbackSrc = fallbackImagePath,
  ...props
}: Props) => {
  const imageSrc = await getImageSrc(src, fallbackSrc);

  return <Image alt={alt} src={imageSrc} {...props} />;
};

const getImageSrc = async (
  src: string | StaticImport,
  fallbackSrc = fallbackImagePath
) => {
  if (!src) return fallbackSrc;

  // If the src is statically imported image, or a data:image string
  if (typeof src === "object" || src.startsWith("data:")) return src;

  // With remote image
  if (src.startsWith("http") || src.startsWith("//")) {
    const isExists = await checkRemoteImageExists(src);
    return isExists ? src : fallbackSrc;
  }

  // With local image
  const localImagePath = path.join(process.cwd(), "public", src);
  const isExists = await checkLocalImageExists(localImagePath);
  return isExists ? src : fallbackSrc;
};

const checkRemoteImageExists = async (url: string) => {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch (error) {
    console.error(
      `checkRemoteImageExists - Error checking image with url: ${url} - ${error}`
    );
    return false;
  }
};
const checkLocalImageExists = async (path: string) => {
  try {
    await fs.promises.access(path, fs.constants.F_OK);
    return true;
  } catch (error) {
    console.error(
      `checkLocalImageExists - Error checking image with path: ${path} - ${error}`
    );
    return false;
  }
};
