import { IThumbnails } from './thumbnails.model';
import { ILocalized } from './localized.model';

export interface ISnippetPlaylist {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: IThumbnails;
    channelTitle: string;
    localized: ILocalized;
}