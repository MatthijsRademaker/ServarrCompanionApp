/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { HealthCheckResult } from "./healthCheckResult";
import type { HttpUri } from "./httpUri";

export interface HealthResource {
  id?: number;
  /** @nullable */
  message?: string | null;
  /** @nullable */
  source?: string | null;
  type?: HealthCheckResult;
  wikiUrl?: HttpUri;
}