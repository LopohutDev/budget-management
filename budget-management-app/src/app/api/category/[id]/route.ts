import { parseBody } from "@/app/helpers/bodyHelper";
import { getUser } from "@/app/lib/getUser";

interface CategoryParams {
  id: string;
}

export async function GET(
  req: Request,
  { params }: { params: CategoryParams }
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
      `${process.env.API_BASE_URL}/categories/${params.id}`,
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
        message: "Category Transaction fetched successfully",
        data: json,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Failed to fetch category transaction", { cause: error });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: CategoryParams }
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
      `${process.env.API_BASE_URL}/categories/${params.id}`,
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
        message: "Category removed successfully",
        data: json,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    throw new Error("Failed to remove category", { cause: error });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: CategoryParams }
) {
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

    const res = await fetch(
      `${process.env.API_BASE_URL}/categories/${params.id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyText),
      }
    );

    const json = await res.json();

    return new Response(
      JSON.stringify({
        message: "Category Updated Successfully",
        data: { ...json, statusCode: res.status },
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error("Failed to update category", { cause: error });
  }
}
