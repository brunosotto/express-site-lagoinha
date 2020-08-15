import { IThumbnails } from './thumbnails.model';
import { IItemId } from './item-id.mode';

export interface ISnippetPlaylistItem {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnails;
    channelTitle: string;
    playlistId: string;
    position: number;
    resourceId: IItemId;
}