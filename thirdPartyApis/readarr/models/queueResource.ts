/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Readarr
 * Readarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { AuthorResource } from "./authorResource";
import type { BookResource } from "./bookResource";
import type { CustomFormatResource } from "./customFormatResource";
import type { DownloadProtocol } from "./downloadProtocol";
import type { QualityModel } from "./qualityModel";
import type { TrackedDownloadStatusMessage } from "./trackedDownloadStatusMessage";
import type { TimeSpan } from "./timeSpan";
import type { TrackedDownloadState } from "./trackedDownloadState";
import type { TrackedDownloadStatus } from "./trackedDownloadStatus";

export interface QueueResource {
  author?: AuthorResource;
  /** @nullable */
  authorId?: number | null;
  book?: BookResource;
  /** @nullable */
  bookId?: number | null;
  /** @nullable */
  customFormats?: CustomFormatResource[] | null;
  customFormatScore?: number;
  /** @nullable */
  downloadClient?: string | null;
  downloadClientHasPostImportCategory?: boolean;
  downloadForced?: boolean;
  /** @nullable */
  downloadId?: string | null;
  /** @nullable */
  errorMessage?: string | null;
  /** @nullable */
  estimatedCompletionTime?: string | null;
  id?: number;
  /** @nullable */
  indexer?: string | null;
  /** @nullable */
  outputPath?: string | null;
  protocol?: DownloadProtocol;
  quality?: QualityModel;
  size?: number;
  sizeleft?: number;
  /** @nullable */
  status?: string | null;
  /** @nullable */
  statusMessages?: TrackedDownloadStatusMessage[] | null;
  timeleft?: TimeSpan;
  /** @nullable */
  title?: string | null;
  trackedDownloadState?: TrackedDownloadState;
  trackedDownloadStatus?: TrackedDownloadStatus;
}
