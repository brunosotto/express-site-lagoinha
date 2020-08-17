import { ISnippetPlaylist } from './snippet-playlist.model';
import { IPlaylistItem } from './playlist-item.model';

export interface IPlaylist {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnippetPlaylist;
    items: IPlaylistItem[];
}