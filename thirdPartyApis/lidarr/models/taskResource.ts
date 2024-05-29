/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { TimeSpan } from "./timeSpan";

export interface TaskResource {
  id?: number;
  interval?: number;
  lastDuration?: TimeSpan;
  lastExecution?: string;
  lastStartTime?: string;
  /** @nullable */
  name?: string | null;
  nextExecution?: string;
  /** @nullable */
  taskName?: string | null;
}