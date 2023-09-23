import { getUser } from "@/app/lib/getUser";

interface budgetParams {
  id: string;
}

export async function GET(req: Request, { params }: { params: budgetParams }) {
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

    const res = await fetch(
      `${process.env.API_BASE_URL}/budgets/${params.id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

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

export async function DELETE(
  req: Request,
  { params }: { params: budgetParams }
) {
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

    const res = await fetch(
      `${process.env.API_BASE_URL}/budgets/${params.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const json = await res.json();

    return new Response(
      JSON.stringify({
        message: "Budget removed successfully",
        data: json,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Failed to remove budget", { cause: error });
  }
}
