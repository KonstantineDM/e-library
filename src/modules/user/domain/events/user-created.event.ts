import { UserAggregatePrimitives } from '../types/user-aggregate-primitives.type';

type UserCreatedEventPayload = UserAggregatePrimitives;

export class UserCreatedEvent {
  constructor(public readonly payload: UserCreatedEventPayload) {}
}
