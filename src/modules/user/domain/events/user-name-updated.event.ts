import { UserAggregatePrimitives } from '../types/user-aggregate-primitives.type';

type UserNameUpdatedEventPayload = UserAggregatePrimitives;

export class UserNameUpdatedEvent {
  constructor(public readonly payload: UserNameUpdatedEventPayload) {}
}
