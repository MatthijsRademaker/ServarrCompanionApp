/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Field } from "./field";

export interface AutoTaggingSpecificationSchema {
  /** @nullable */
  fields?: Field[] | null;
  id?: number;
  /** @nullable */
  implementation?: string | null;
  /** @nullable */
  implementationName?: string | null;
  /** @nullable */
  name?: string | null;
  negate?: boolean;
  required?: boolean;
}
