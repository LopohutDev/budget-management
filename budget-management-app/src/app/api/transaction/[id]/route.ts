import { buildURL } from "@/app/helpers";
import { getUser } from "@/app/lib/getUser";

interface TransactionParams {
  id: string;
}

export async function DELETE(
  req: Request,
  { params }: { params: TransactionParams }
) {
  const url = buildURL(`${process.env.API_BASE_URL}/transactions/${params.id}`);

  try {
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

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        "Content-Type": "application/json",
      },
    });

    const json = await res.json();

    return new Response(
      JSON.stringify({
        message: "Transaction removed successfully",
        data: json,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Failed to remove transaction", { cause: error });
  }
}
