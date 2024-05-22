/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Readarr
 * Readarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { MonitorTypes } from "./monitorTypes";
import type { NewItemMonitorTypes } from "./newItemMonitorTypes";

export interface RootFolderResource {
  accessible?: boolean;
  defaultMetadataProfileId?: number;
  defaultMonitorOption?: MonitorTypes;
  defaultNewItemMonitorOption?: NewItemMonitorTypes;
  defaultQualityProfileId?: number;
  /** @nullable */
  defaultTags?: number[] | null;
  /** @nullable */
  freeSpace?: number | null;
  /** @nullable */
  host?: string | null;
  id?: number;
  isCalibreLibrary?: boolean;
  /** @nullable */
  library?: string | null;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  outputFormat?: string | null;
  /** @nullable */
  outputProfile?: string | null;
  /** @nullable */
  password?: string | null;
  /** @nullable */
  path?: string | null;
  port?: number;
  /** @nullable */
  totalSpace?: number | null;
  /** @nullable */
  urlBase?: string | null;
  /** @nullable */
  username?: string | null;
  useSsl?: boolean;
}
