/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { CustomFormatResource } from "./customFormatResource";
import type { DownloadProtocol } from "./downloadProtocol";
import type { QualityModel } from "./qualityModel";

export interface ReleaseResource {
  age?: number;
  ageHours?: number;
  ageMinutes?: number;
  /** @nullable */
  airDate?: string | null;
  /** @nullable */
  albumId?: number | null;
  /** @nullable */
  albumTitle?: string | null;
  approved?: boolean;
  /** @nullable */
  artistId?: number | null;
  /** @nullable */
  artistName?: string | null;
  /** @nullable */
  commentUrl?: string | null;
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  discography?: boolean;
  downloadAllowed?: boolean;
  /** @nullable */
  downloadClient?: string | null;
  /** @nullable */
  downloadClientId?: number | null;
  /** @nullable */
  downloadUrl?: string | null;
  /** @nullable */
  guid?: string | null;
  id?: number;
  /** @nullable */
  indexer?: string | null;
  indexerFlags?: number;
  indexerId?: number;
  /** @nullable */
  infoHash?: string | null;
  /** @nullable */
  infoUrl?: string | null;
  /** @nullable */
  leechers?: number | null;
  /** @nullable */
  magnetUrl?: string | null;
  protocol?: DownloadProtocol;
  publishDate?: string;
  quality?: QualityModel;
  qualityWeight?: number;
  rejected?: boolean;
  /** @nullable */
  rejections?: string[] | null;
  /** @nullable */
  releaseGroup?: string | null;
  /** @nullable */
  releaseHash?: string | null;
  releaseWeight?: number;
  sceneSource?: boolean;
  /** @nullable */
  seeders?: number | null;
  size?: number;
  /** @nullable */
  subGroup?: string | null;
  temporarilyRejected?: boolean;
  /** @nullable */
  title?: string | null;
}
