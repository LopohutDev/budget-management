import { parseBody } from "@/app/helpers/bodyHelper";
import { getUser } from "@/app/lib/getUser";

export async function POST(req: Request) {
  try {
    const bodyText = await parseBody(req);
    const user = await getUser(req);

    if (!user) {
      throw new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: 401,
        }
      );
    }

    const res = await fetch(`${process.env.API_BASE_URL}/budgets/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyText),
    });

    const json = await res.json();

    return new Response(
      JSON.stringify({
        message: "Budget Created Successfully",
        data: { ...json, statusCode: res.status },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Failed to create budget", { cause: error });
  }
}

export async function GET(req: Request) {
  try {
    // const bodyText = await parseBody(req);
    const user = await getUser(req);

    if (!user) {
      throw new Response(
        JSON.stringify({
          message: "Unauthorized",
        }),
        {
          status: 401,
        }
      );
    }

    const res = await fetch(`${process.env.API_BASE_URL}/budgets`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return new Response(
      JSON.stringify({
        message: "Budget fetched successfully",
        data: json,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Failed to fetch budget", { cause: error });
  }
}
