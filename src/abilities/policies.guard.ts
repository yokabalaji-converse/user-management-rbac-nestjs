import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConsoleLogger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from './casl-ability-factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { PolicyHandler } from './policy-handler.interface';
import { AppAbility } from './ability';

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];
    console.log(policyHandlers);
    const request = context.switchToHttp().getRequest();
    console.log(request.user);
    const ability = this.caslAbilityFactory.createForUser(request.user);
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
