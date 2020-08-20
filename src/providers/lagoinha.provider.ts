import { get, RequestOptions } from 'https';
import * as qs from 'querystring';
import { wLogger } from '../shared/logger';
import jsonfile from 'jsonfile';

//  Models
export interface IParamsRequestLagoinha {
    limit: number;
    offset: number;
    section: string;
    page__published: boolean;
    page__categories: number;
}

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

export interface IObjectLagGroup {
    created_at: Date;
    has_regional: boolean;
    has_subgroup: boolean;
    has_tertiary_group: boolean;
    id: number;
    is_active: boolean;
    label_regional: string;
    label_subgroup: string;
    label_tertiary_group: string;
    name: string;
    resource_uri: string;
    updated_at: string;
}

export interface IObjectLagCateg {
    disabled: boolean;
    id: number;
    name: string;
    resource_uri: string;
    subgroup: string;
}

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

// Constantes
const DEVOCIONAIS_CATEG = 488;
const ESTUDO_GC_CATEG = 397;
const TIMEOUT_REQ_LAGOINHA = 3 * 60 * 60 * 1000; // 3 horas
const BASE_URL = 'https://www.inradar.com.br/api/v1/inchurch_group_page/';
const LIMIT = 12;
const OFFSET = 0;
const SECTION = 'news';

export class LagoinhaProvider {

    public devocionais: IObjectLagoinha[] = [];
    public estudoGC: IObjectLagoinha[] = [];

    constructor() {
        this.initialize();
    }

    private async initialize(): Promise<void> {
        // lista os canais imediatamente e também agenta o interval
        this.listData();
        setInterval(_ => {
            this.listData();
        }, TIMEOUT_REQ_LAGOINHA);
    }

    private listData(): void {
        this.listDevocinal();
        this.listEstudo();
    }

    private listDevocinal(): void {
        const params = {
            limit: LIMIT,
            offset: OFFSET,
            section: SECTION,
            page__published: true,
            page__categories: DEVOCIONAIS_CATEG,
        };

        const success = (response: IResponseLagoinha) => {
            this.devocionais = response.objects;
        };

        this.request(params, success);
    }

    private listEstudo(): void {
        const params = {
            limit: LIMIT,
            offset: OFFSET,
            section: SECTION,
            page__published: true,
            page__categories: ESTUDO_GC_CATEG,
        };

        const success = (response: IResponseLagoinha) => {
            this.estudoGC = response.objects;
        };

        this.request(params, success);
    }

    private request(params: IParamsRequestLagoinha, success: (response: any) => void): any {
        const paramsStr = qs.stringify({ ...params });
        const url = `${BASE_URL}?${paramsStr}`;
        const options: RequestOptions = {
            headers: {
                appId: 'br.com.inchurch.lagoinha',
            },
        };
        get(url, options, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'] as string;

            let hasError;
            if (statusCode !== 200) {
                hasError = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
                hasError = new Error('Invalid content-type.\n' +
                    `Expected application/json but received ${contentType}`);
            }

            if (hasError) {
                wLogger.error(JSON.stringify(hasError));
                return;
            }

            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(rawData);
                    success(parsedData);
                } catch (e) {
                    wLogger.error(JSON.stringify(e));
                }
            });
        });
        return;
    }

}
