import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';

import { User } from '../../models/user/entities/user.entity';
import { Permission } from 'src/models/permission/entities/permission.entity';
import { Role } from 'src/models/role/entities/role.entity';

type Subjects =
  | InferSubjects<typeof User | typeof Role | typeof Permission>
  | 'all'
  | 'Permission'
  | 'Role'
  | 'User';

console.log('ability class');

export type AppAbility = PureAbility<[string, Subjects]>;

export function defineAbilitiesFor(user: User) {
  const { can, cannot, build } = new AbilityBuilder(
    PureAbility as AbilityClass<AppAbility>,
  );

  if (user && user.roles && user.roles.some((role) => role.name === 'admin')) {
    can('manage', 'all'); // Admin can manage everything
  } else if (user && user.roles) {
    user.roles.forEach((role) => {
      if (role.permissions) {
        role.permissions.forEach((permission) => {
          // Assuming permission.model is a string that corresponds to an entity name
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
              console.log('model mistakes  ');
              throw new Error(`Unknown model: ${permission.model}`);
          }
          can(permission.action, subject);
        });
      }
    });
  }

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
}
