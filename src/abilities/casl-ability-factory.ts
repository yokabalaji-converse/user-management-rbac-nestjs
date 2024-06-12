import { Injectable } from '@nestjs/common';
import { defineAbilitiesFor, AppAbility } from '../abilities/ability';
import { User } from '../entities/user.entity';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    return defineAbilitiesFor(user);
  }
}
