/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ApplyTags } from "./applyTags";

export interface IndexerBulkResource {
  applyTags?: ApplyTags;
  /** @nullable */
  enableAutomaticSearch?: boolean | null;
  /** @nullable */
  enableInteractiveSearch?: boolean | null;
  /** @nullable */
  enableRss?: boolean | null;
  /** @nullable */
  ids?: number[] | null;
  /** @nullable */
  priority?: number | null;
  /** @nullable */
  tags?: number[] | null;
}
