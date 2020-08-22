import { IObjectLagoinha } from './object-lagoinha.model';

export interface IResponseLagoinha {
    meta: {
        limit: number;
        next: string;
        offset: number;
        previous: string;
        total_count: number;
    };
    objects: IObjectLagoinha[];
}