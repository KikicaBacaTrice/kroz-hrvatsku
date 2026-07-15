import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ULOGE_KEY } from './uloge.decorator';

@Injectable()
export class UlogeGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const trazeneUloge = this.reflector.getAllAndOverride<number[]>(ULOGE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!trazeneUloge || trazeneUloge.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const korisnik = request.user;

    if (!korisnik || !trazeneUloge.includes(korisnik.ulogaId)) {
      throw new ForbiddenException('Pristup odbijen');
    }

    return true;
  }
}
