import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class UserMatchGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const id = request.params.id;
    const user = request.user as { sub: number } | undefined;

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (!id) {
      throw new UnauthorizedException('Missing id parameter');
    }

    const userId = Number(id);
    if (isNaN(userId)) {
      throw new UnauthorizedException('Invalid id parameter');
    }

    if (user.sub !== userId) {
      throw new UnauthorizedException('You are not allowed to perform this operation');
    }

    return true;
  }
}