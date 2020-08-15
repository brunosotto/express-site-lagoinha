import { ISnippetChannel } from './snippet-channel.model';
import { IPlaylist } from './playlist.model';
import { IRecentItem } from './recent-item.model';

export interface IChannel {
    kind: string;
    etag: string;
    id: string;
    snippet: ISnippetChannel;
    playlists: IPlaylist[];
    recents: IRecentItem[];
}