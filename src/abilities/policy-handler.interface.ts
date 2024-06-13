// src/abilities/policy-handler.interface.ts

import { AppAbility } from './ability';

export type PolicyHandlerCallback = (ability: AppAbility) => boolean;

export interface IPolicyHandler {
  handle(ability: AppAbility): boolean;
}

export type PolicyHandler = IPolicyHandler | PolicyHandlerCallback;
