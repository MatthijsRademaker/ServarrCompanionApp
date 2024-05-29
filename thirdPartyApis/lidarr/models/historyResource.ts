/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { AlbumResource } from "./albumResource";
import type { ArtistResource } from "./artistResource";
import type { CustomFormatResource } from "./customFormatResource";
import type { HistoryResourceData } from "./historyResourceData";
import type { EntityHistoryEventType } from "./entityHistoryEventType";
import type { QualityModel } from "./qualityModel";
import type { TrackResource } from "./trackResource";

export interface HistoryResource {
  album?: AlbumResource;
  albumId?: number;
  artist?: ArtistResource;
  artistId?: number;
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  /** @nullable */
  data?: HistoryResourceData;
  date?: string;
  /** @nullable */
  downloadId?: string | null;
  eventType?: EntityHistoryEventType;
  id?: number;
  quality?: QualityModel;
  qualityCutoffNotMet?: boolean;
  /** @nullable */
  sourceTitle?: string | null;
  track?: TrackResource;
  trackId?: number;
}