import { IItemId } from './item-id.mode';
import { IVideoSnippet } from './video-snippet.model';

export interface IRecentItem {
    kind: string;
    etag: string;
    id: IItemId;
    snippet: IVideoSnippet;
}