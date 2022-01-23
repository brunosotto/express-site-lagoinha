import { get, RequestOptions } from 'https';
import * as qs from 'querystring';
import { wLogger } from '../shared/logger';
import moment from 'moment';
//  Models
import { IParamsRequestLagoinha } from './../models/params-request-lagoinha.model';
import { IObjectLagoinha } from './../models/object-lagoinha.model';
import { IResponseLagoinha } from './../models/response-lagoinha.model';

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
            this.devocionais = this.removeStyles(response.objects);
        };

        this.request(params, success);
    }

    private removeStyles(content: IObjectLagoinha[]): IObjectLagoinha[] {
        return content.map(l => {
            l.page.text = l.page.text.replace(/style="[a-zA-Z0-9:;&\.\s\(\)\-\,]*"/gi, '');
            l.page.text = l.page.text.replace(/<\/font[^>]*>/gi, '');
            l.page.text = l.page.text.replace(/<font[^>]*>/gi, '');
            return l;
        });
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
            this.estudoGC = this.removeStyles(response.objects);
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

    public lastPublishedAtDev(): string {
        const data = this.devocionais[0].published_at;
        return moment(data).toISOString();
    }

    public lastPublishedAtGc(): string {
        const data = this.estudoGC[0].published_at;
        return moment(data).toISOString();

    }
}
