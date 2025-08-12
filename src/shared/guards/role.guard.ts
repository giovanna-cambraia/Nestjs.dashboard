import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "@prisma/client";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) { }

    canActivate(context: ExecutionContext) {
        const requeridRules = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (!requeridRules) return true;

        const { user } = context.switchToHttp().getRequest();

        if (!user) return false;

        return requeridRules.some((role) => user.role === role);
    }
}