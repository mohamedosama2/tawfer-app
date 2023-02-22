import type { TokenInput } from "./pagination.model";
export interface NotificationSubscribe extends TokenInput {
  NotificationToken: string;
  type: string;
}
