import { ISnippetPlaylistItem } from './snippet-playlist-item.model';

export interface IPlaylistItem {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnippetPlaylistItem;
}