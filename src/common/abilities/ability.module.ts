import { Module } from '@nestjs/common';
import { CaslAbilityFactory } from './common-ability-schema-language-factory';

@Module({
  providers: [CaslAbilityFactory],
  exports: [CaslAbilityFactory],
})
export class AbilityModule {}
