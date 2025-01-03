import { ChangelogClient } from "./api/ChangelogClient";
import { IChangelogItem } from "./api/models/IChangelogItem";
import { ChangelogUpdateManager } from "./services/ChangelogUpdatesManager";
import { IChangelogItemStateful } from "./services/models/IChangelogItemStateful";

import UnreadBadge from "./components/UnreadBadge";
import UnreadBadgeControlled from "./components/UnreadBadgeControlled";
import ChangelogPopup from "./components/ChangelogPopup";

export type { IChangelogItem, IChangelogItemStateful };
export { ChangelogUpdateManager, ChangelogClient, UnreadBadge, UnreadBadgeControlled, ChangelogPopup };
