/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Readarr
 * Readarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ApplyTags } from "./applyTags";

export interface ImportListBulkResource {
  applyTags?: ApplyTags;
  /** @nullable */
  enableAutomaticAdd?: boolean | null;
  /** @nullable */
  ids?: number[] | null;
  /** @nullable */
  metadataProfileId?: number | null;
  /** @nullable */
  qualityProfileId?: number | null;
  /** @nullable */
  rootFolderPath?: string | null;
  /** @nullable */
  tags?: number[] | null;
}
