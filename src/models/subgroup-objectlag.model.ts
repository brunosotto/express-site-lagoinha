import { IObjectLagCateg } from './object-lagcateg.model';

export interface ISubgroupObjectLag {
    app_id: string;
    bonus_url: string;
    categories: IObjectLagCateg[];
    code: string;
    created_at: Date;
    donation_cod_url: string;
    donation_entry_category: string;
    donation_url: string;
    email_mkt: string;
    event_entry_category: string;
    financial_data_block: string;
    group: string;
    guide_entry_category: string;
    id: number;
    is_active: boolean;
    is_blocked: boolean;
    is_defaulter: boolean;
    logo: string;
    membership_cod_url: string;
    membership_url: string;
    name: string;
    on_inactive_tertiarygroups: string;
    onesignal_app_id: string;
    onesignal_rest_api_key: string;
    onesignal_user_id_android: string;
    onesignal_user_id_ios: string;
    promo_video_url: string;
    regional: string;
    resource_uri: string;
    send_welcome_email: boolean;
    soundcloud_client_id: string;
    soundcloud_secret: string;
    tickets_cod_url: string;
    tickets_url: string;
    updated_at: Date;
    version: string;
    visitors_group: string;
    website_url: string;
}