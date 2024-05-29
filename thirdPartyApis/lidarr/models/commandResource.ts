/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Command } from "./command";
import type { TimeSpan } from "./timeSpan";
import type { CommandPriority } from "./commandPriority";
import type { CommandResult } from "./commandResult";
import type { CommandStatus } from "./commandStatus";
import type { CommandTrigger } from "./commandTrigger";

export interface CommandResource {
  body?: Command;
  /** @nullable */
  clientUserAgent?: string | null;
  /** @nullable */
  commandName?: string | null;
  duration?: TimeSpan;
  /** @nullable */
  ended?: string | null;
  /** @nullable */
  exception?: string | null;
  id?: number;
  /** @nullable */
  lastExecutionTime?: string | null;
  /** @nullable */
  message?: string | null;
  /** @nullable */
  name?: string | null;
  priority?: CommandPriority;
  queued?: string;
  result?: CommandResult;
  sendUpdatesToClient?: boolean;
  /** @nullable */
  started?: string | null;
  /** @nullable */
  stateChangeTime?: string | null;
  status?: CommandStatus;
  trigger?: CommandTrigger;
  updateScheduledTask?: boolean;
}
