import { buildURLWithParams } from "@/app/helpers";
import { parseBody } from "@/app/helpers/bodyHelper";
import { getUser } from "@/app/lib/getUser";

interface TransactionParams {
  categoryId: string;
}

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

    const res = await fetch(`${process.env.API_BASE_URL}/transactions/create`, {
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
        message: "Transaction Created Successfully",
        data: { ...json, statusCode: res.status },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create transaction", { cause: error });
  }
}
