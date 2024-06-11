import {
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { User } from '../entities/user.entity';
import { Role } from '../entities/role.entity';
import { Permission } from '../entities/permission.entity';

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
        can(permission.action, permission.model);
      });
    });
  }

  return build({
    detectSubjectType: (item) =>
      item.constructor as ExtractSubjectType<Subjects>,
  });
}
