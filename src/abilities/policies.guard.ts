import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability-factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { PolicyHandler } from './policy-handler.interface';
import { AppAbility } from './ability';
import { Request } from 'express';
import { User } from '../entities/user.entity';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from 'src/types/jwt-payload-types';
import { error } from 'console';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    console.log('plkljkl' + policyHandlers);

    const request = context.switchToHttp().getRequest();
    const users = request.user as User;
    console.log(users);
    const user = await this.userService.findOne(users['userId']);

    console.log(user);
    const ability = this.caslAbilityFactory.createForUser(user);
    console.log(this.caslAbilityFactory);

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability),
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === 'function') {
      console.log('polices ability 1');

      console.log(handler(ability));

      return handler(ability);
    }
    console.log('polices ability 2');
    return handler.handle(ability);
  }
}
