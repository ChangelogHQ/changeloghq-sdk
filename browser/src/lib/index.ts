import { ChangelogClient } from "./api/ChangelogClient";
import { IChangelogItem } from "./api/models/IChangelogItem";
import { ChangelogUpdateManager } from "./services/ChangelogUpdatesManager";
import { IChangelogItemStateful } from "./services/models/IChangelogItemStateful";

import UnredBadge from "./components/UnredBadge";
import UnredBadgeControlled from "./components/UnredBadgeControlled";

export type { IChangelogItem, IChangelogItemStateful };
export { ChangelogUpdateManager, ChangelogClient, UnredBadge, UnredBadgeControlled };
