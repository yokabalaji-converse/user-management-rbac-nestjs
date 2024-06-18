import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './conditional-access-control-library-factory';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AbilityModule {}
