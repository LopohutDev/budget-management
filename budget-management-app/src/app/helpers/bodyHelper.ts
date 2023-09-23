import { Type } from "typescript";

export const parseBody = async (req: any) => {
  const bodyText = await req.text(); // read the raw text from the incoming request stream

  if (bodyText) {
    return JSON.parse(bodyText);
  }

  return null;
};
