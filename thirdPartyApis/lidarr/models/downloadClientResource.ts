/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { Field } from "./field";
import type { ProviderMessage } from "./providerMessage";
import type { DownloadProtocol } from "./downloadProtocol";

export interface DownloadClientResource {
  /** @nullable */
  configContract?: string | null;
  enable?: boolean;
  /** @nullable */
  fields?: Field[] | null;
  id?: number;
  /** @nullable */
  implementation?: string | null;
  /** @nullable */
  implementationName?: string | null;
  /** @nullable */
  infoLink?: string | null;
  message?: ProviderMessage;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  presets?: DownloadClientResource[] | null;
  priority?: number;
  protocol?: DownloadProtocol;
  removeCompletedDownloads?: boolean;
  removeFailedDownloads?: boolean;
  /** @nullable */
  tags?: number[] | null;
}