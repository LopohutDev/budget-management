import { IncomingMessage, ServerResponse } from "http";
import jwtDecode from "jsonwebtoken";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
export const getUser = async (request: any) => {
  const res: ServerResponse<IncomingMessage> = new ServerResponse(request);
  const session: any = await getServerSession<any>(request, res, authOptions);
  if (session) {
    const user = jwtDecode.decode(session.accessToken) as any;
    return {
      ...user,
      userId: session?.user?.userId,
      accessToken: session.accessToken,
    };
  }
  return null;
};
