import type { MultiPartData } from "h3";
import { Buffer } from "node:buffer";

type TFile = File | MultiPartData;
export const convertFileTOBase64 = async (file: TFile) => {
  if (file instanceof File) {
    const fileBUffer = await file.arrayBuffer();
    return Buffer.from(fileBUffer).toString("base64");
  } else {
    return Buffer.from((file as MultiPartData).data.buffer).toString("base64");
  }
};
