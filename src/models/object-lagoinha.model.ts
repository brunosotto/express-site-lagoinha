import { IObjectLagGroup } from './object-laggroup.model';
import { IObjectLagPage } from './object-lagpage.model';
import { ISubgroupObjectLag } from './subgroup-objectlag.model';

export interface IObjectLagoinha {
    app_active: boolean;
    created_at: Date;
    group: IObjectLagGroup;
    id: number;
    on_blacklist: boolean;
    page: IObjectLagPage;
    published_at: Date;
    published_for: string;
    regional: string;
    resource_uri: string;
    section: string;
    slug: string;
    small_groups: any[];
    subgroup: ISubgroupObjectLag;
    tertiarygroup: string;
    updated_at: Date;
    web_active: boolean;
}
