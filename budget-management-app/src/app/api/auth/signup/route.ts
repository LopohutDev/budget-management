import { NextRequest } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import { parseBody } from "@/app/helpers/bodyHelper";
import { buildURL } from "@/app/helpers";
import { json } from "stream/consumers";

// interface EventData {
//   count: number;
//   take: number;
//   skip: number;
//   data: Event[];
// }

export async function POST(req: NextRequest, res: NextApiResponse) {
  const query = new URL(req.nextUrl.href).searchParams;

  try {
    const url = buildURL(`${process.env.API_BASE_URL}/auth/signup`, query);
    const bodyText = await parseBody(req);

    const signupData = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyText),
    });

    const data = await signupData.json();

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    throw new Error("Sign Up Failed", { cause: error });
  }
}
