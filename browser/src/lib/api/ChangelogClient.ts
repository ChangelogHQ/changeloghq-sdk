import { IChangelogItem } from "./models/IChangelogItem"

export class ChangelogClient {


    // define the constructor
    constructor(private _changelogEndpoint: string) {        
    }

    fetchLatestChanges(): Promise<IChangelogItem[]> {
        return fetch(this._changelogEndpoint + '/latest.json?v' + Date.now())
            .then(response => response.json())
            .then(json => json.map((item: any) => {
                return {
                    Id: item.id,
                    Title: item.title,                    
                    PublishedAt: new Date(item.published_at)
                }
            }))

    }
}