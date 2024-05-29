/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { AllowFingerprinting } from "./allowFingerprinting";
import type { ProperDownloadTypes } from "./properDownloadTypes";
import type { FileDateType } from "./fileDateType";
import type { RescanAfterRefreshType } from "./rescanAfterRefreshType";

export interface MediaManagementConfigResource {
  allowFingerprinting?: AllowFingerprinting;
  autoUnmonitorPreviouslyDownloadedTracks?: boolean;
  /** @nullable */
  chmodFolder?: string | null;
  /** @nullable */
  chownGroup?: string | null;
  copyUsingHardlinks?: boolean;
  createEmptyArtistFolders?: boolean;
  deleteEmptyFolders?: boolean;
  downloadPropersAndRepacks?: ProperDownloadTypes;
  /** @nullable */
  extraFileExtensions?: string | null;
  fileDate?: FileDateType;
  id?: number;
  importExtraFiles?: boolean;
  minimumFreeSpaceWhenImporting?: number;
  /** @nullable */
  recycleBin?: string | null;
  recycleBinCleanupDays?: number;
  rescanAfterRefresh?: RescanAfterRefreshType;
  setPermissionsLinux?: boolean;
  skipFreeSpaceCheckWhenImporting?: boolean;
  watchLibraryForChanges?: boolean;
}
