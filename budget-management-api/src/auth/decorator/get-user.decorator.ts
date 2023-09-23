import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();

    const reqUser: any = request.user;
    if (data) {
      return reqUser[data];
    }
    return reqUser;
  },
);
