/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Readarr
 * Readarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { BookListLazyLoaded } from "./bookListLazyLoaded";
import type { SeriesBookLinkListLazyLoaded } from "./seriesBookLinkListLazyLoaded";

export interface Series {
  books?: BookListLazyLoaded;
  /** @nullable */
  description?: string | null;
  /** @nullable */
  foreignAuthorId?: string | null;
  /** @nullable */
  foreignSeriesId?: string | null;
  id?: number;
  linkItems?: SeriesBookLinkListLazyLoaded;
  numbered?: boolean;
  primaryWorkCount?: number;
  /** @nullable */
  title?: string | null;
  workCount?: number;
}
