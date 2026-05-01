import { UserAggregatePrimitives } from '../types/user-aggregate-primitives.type';

type UserDeletedEventPayload = UserAggregatePrimitives;

export class UserDeletedEvent {
  constructor(public readonly payload: UserDeletedEventPayload) {}
}
