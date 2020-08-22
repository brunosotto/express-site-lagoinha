import { IObjectLagCateg } from './object-lagcateg.model';

export interface IObjectLagPage {
    app_image: string;
    categories: IObjectLagCateg[];
    end: Date;
    id: number;
    image: string;
    main_color: string;
    published: boolean;
    resource_uri: string;
    slug: string;
    start: Date;
    summary: string;
    text: string;
    thumbnail: string;
    title: string;
    web_published: boolean;
    web_version: string;
}