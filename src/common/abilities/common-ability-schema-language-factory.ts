import { Injectable } from '@nestjs/common';
import { defineAbilitiesFor, AppAbility } from './ability';
import { User } from '../../models/user/entities/user.entity';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AppAbility {
    return defineAbilitiesFor(user);
  }
}
