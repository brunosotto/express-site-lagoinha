import { IThumbnails } from './thumbnails.model';
import { ILocalized } from './localized.model';

export interface ISnippetChannel {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: IThumbnails;
    localized: ILocalized;
    country: string;
}