/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { ParsedTrackInfo } from "./parsedTrackInfo";
import type { CustomFormatResource } from "./customFormatResource";
import type { MediaInfoResource } from "./mediaInfoResource";
import type { QualityModel } from "./qualityModel";

export interface TrackFileResource {
  albumId?: number;
  artistId?: number;
  audioTags?: ParsedTrackInfo;
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  dateAdded?: string;
  id?: number;
  /** @nullable */
  indexerFlags?: number | null;
  mediaInfo?: MediaInfoResource;
  /** @nullable */
  path?: string | null;
  quality?: QualityModel;
  qualityCutoffNotMet?: boolean;
  qualityWeight?: number;
  /** @nullable */
  releaseGroup?: string | null;
  /** @nullable */
  sceneName?: string | null;
  size?: number;
}