/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { AutoTaggingSpecificationSchema } from "./autoTaggingSpecificationSchema";

export interface AutoTaggingResource {
  id?: number;
  /** @nullable */
  name?: string | null;
  removeTagsAutomatically?: boolean;
  /** @nullable */
  specifications?: AutoTaggingSpecificationSchema[] | null;
  /** @nullable */
  tags?: number[] | null;
}
