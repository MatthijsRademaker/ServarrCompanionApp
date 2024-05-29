/**
 * Generated by orval v6.29.1 🍺
 * Do not edit manually.
 * Lidarr
 * Lidarr API docs
 * OpenAPI spec version: 1.0.0
 */
import type { AuthenticationType } from "./authenticationType";
import type { DatabaseType } from "./databaseType";
import type { Version } from "./version";
import type { RuntimeMode } from "./runtimeMode";
import type { UpdateMechanism } from "./updateMechanism";

export interface SystemResource {
  /** @nullable */
  appData?: string | null;
  /** @nullable */
  appName?: string | null;
  authentication?: AuthenticationType;
  /** @nullable */
  branch?: string | null;
  buildTime?: string;
  databaseType?: DatabaseType;
  databaseVersion?: Version;
  /** @nullable */
  instanceName?: string | null;
  isAdmin?: boolean;
  isDebug?: boolean;
  isDocker?: boolean;
  isLinux?: boolean;
  isNetCore?: boolean;
  isOsx?: boolean;
  isProduction?: boolean;
  isUserInteractive?: boolean;
  isWindows?: boolean;
  migrationVersion?: number;
  mode?: RuntimeMode;
  /** @nullable */
  osName?: string | null;
  /** @nullable */
  osVersion?: string | null;
  /** @nullable */
  packageAuthor?: string | null;
  packageUpdateMechanism?: UpdateMechanism;
  /** @nullable */
  packageUpdateMechanismMessage?: string | null;
  /** @nullable */
  packageVersion?: string | null;
  /** @nullable */
  runtimeName?: string | null;
  runtimeVersion?: Version;
  startTime?: string;
  /** @nullable */
  startupPath?: string | null;
  /** @nullable */
  urlBase?: string | null;
  /** @nullable */
  version?: string | null;
}