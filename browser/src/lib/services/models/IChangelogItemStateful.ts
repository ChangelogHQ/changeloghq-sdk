import { IChangelogItem } from "../../api/models/IChangelogItem";

export interface IChangelogItemStateful extends IChangelogItem {
    isRead: boolean
}
