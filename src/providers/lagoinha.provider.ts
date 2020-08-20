import { get, RequestOptions } from 'https';
import * as qs from 'querystring';
import { wLogger } from '../shared/logger';

//  Models
import { IParamsRequestLagoinha } from './../models/params-request-lagoinha.model';
import { IObjectLagoinha } from 'src/models/object-lagoinha.model';
import { IResponseLagoinha } from 'src/models/response-lagoinha.model';

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

    public exemplos(): void {
        // estou separando um aqui para o exemplo, mas na tela vc vai consumir o array devocionais
        // estudo de GC é idêntico
        const devocional = this.devocionais[0];

        // a lista será algo parecido com https://lagoinha.com/lagoinha-news?cat=397
        // para a lista vai usar
        console.log(devocional.page.thumbnail);
        console.log(devocional.page.title);
        console.log(devocional.page.summary);
        console.log(devocional.published_at);
        // para a url de link com a página aberta use o id e o slug
        console.log(`${devocional.id}/${devocional.slug}`);

        // para a página aberta de algum devocional
        // parecido com https://lagoinha.com/lagoinha-news/24628/o-temor-de-deus-no-coracao-dos-homens
        console.log(devocional.page.image);
        console.log(devocional.page.main_color);
        console.log(devocional.page.title);
        console.log(devocional.page.text);
        console.log(devocional.published_at);
        // repare no main_color. é uma cor que a api nos dá calculada com base na image. isso pode ser usado aqui e na lista se vc achar necessário
        // repare que a página aberta deles não mostra a data de publicação mas no nosso coloque
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
