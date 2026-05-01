import { UserAggregatePrimitives } from '../types/user-aggregate-primitives.type';

type UserUpdatedEventPayload = UserAggregatePrimitives;

export class UserPhoneNumberUpdatedEvent {
  constructor(public readonly payload: UserUpdatedEventPayload) {}
}
