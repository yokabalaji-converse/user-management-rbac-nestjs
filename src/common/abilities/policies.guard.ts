import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './common-ability-schema-language-factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { PolicyHandler } from './policy-handler.interface';
import { AppAbility } from './ability';
import { User } from '../../models/user/entities/user.entity';
import { UserService } from 'src/models/user/user.service';

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
