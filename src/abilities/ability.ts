import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';

import { User } from '../entities/user.entity';
import { Permission } from '../entities/permission.entity';
import { Role } from '../entities/role.entity';

type Subjects =
  | InferSubjects<typeof User | typeof Role | typeof Permission>
  | 'all';

export type AppAbility = PureAbility<[string, Subjects]>;

export function defineAbilitiesFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(
    PureAbility as AbilityClass<AppAbility>,
  );

  if (user.roles.some((role) => role.name === 'admin')) {
    can('manage', 'all'); // Admin can manage everything
  } else {
    user.roles.forEach((role) => {
      role.permissions.forEach((permission) => {
        let subject: Subjects;
        switch (permission.model) {
          case 'user':
            subject = User;
            break;
          case 'permission':
            subject = Permission;
            break;
          case 'role':
            subject = Role;
            break;
          default:
            throw new Error(`Unknown model: ${permission.model}`);
        }
        can(permission.action, subject);
      });
    });
  }

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
}
