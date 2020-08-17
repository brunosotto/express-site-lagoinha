import { get } from 'https';
import * as qs from 'querystring';
import { wLogger } from '../shared/logger';
import jsonfile from 'jsonfile';

//  Models
import { IParamsRequestYT } from './../models/params-request-yt.model';
import { IChannel } from './../models/channel.model';
import { IPlaylist } from './../models/playlist.model';

 
export type resolveFn = (value?: IChannel[] | PromiseLike<IChannel[]> | undefined) => void;
export type rejectFn = (reason?: any) => void;

const usingMockDb = (process.env.USE_MOCK_DB || '').toLowerCase();

export class YouTubeProvider {

    private readonly dbFilePath = 'src/providers/youtube.mock.json';
    private channelKeys = ['UC-A4tH3VNuty6SjZqO9vtfw', 'UCJzDLUYpybKcK5FkZlSQVZQ'];
    private apiKey = 'AIzaSyCqTDq1Envdq1czGv6CcCNu09LhHwSfB7k';
    private baseUrl = 'https://www.googleapis.com/youtube/v3';
    private recentMaxResults = 6;
    private playlistsMaxResults = 12;
    private playlistsItemsMaxResults = 6;
    private channels: IChannel[] = [];
    private timeout = 8 * 60 * 60 * 1000; // 8 horas
    private lastReq: Date | null = null;
    private promiseSuccess: resolveFn[] = [];
    private promiseError: rejectFn[] = [];
    private loading = false;

    constructor() {
        if (!usingMockDb) {
            this.initialize();
        }
    }

    private initialize(): void {
        this.channels = [];
        this.loading = true;

        this.listChannels();
    }

    public async getChannels(): Promise<IChannel[]> {
        const promise = new Promise<IChannel[]>(async (resolve, reject) => {
            if (usingMockDb) {
                const channels = await this.readMock();
                resolve(channels);
                return;
            }

            if (this.lastReq && (new Date().getTime() - this.lastReq.getTime() < this.timeout)) {
                resolve(this.channels);
                return;
            }

            this.promiseSuccess.push(resolve);
            this.promiseError.push(reject);

            if (!this.loading) {
                this.initialize();
            }
        });
        return promise;
    }

    private readMock(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }

    private listChannels(): void {
        const params = {
            part: 'snippet',
            id: this.channelKeys.join(),
        };

        const success = (response: any) => {
            response.items.forEach((channel: IChannel) => {
                this.listPlaylists(channel);
                this.listRecent(channel);
            });
            this.channels.push(...response.items);
        };

        this.requestYT('channels', params, success);
    }

    private listPlaylists(channel: IChannel): void {
        const params = {
            part: 'snippet',
            channelId: channel.id,
            maxResults: this.playlistsMaxResults,
        };

        const success = (response: any) => {
            channel.playlists = response.items;
            channel.playlists.forEach(p => this.listPlaylistItems(p));
        };

        this.requestYT('playlists', params, success);
    }

    private listPlaylistItems(playlist: IPlaylist): void {
        const params = {
            part: 'snippet',
            playlistId: playlist.id,
            maxResults: this.playlistsItemsMaxResults,
        };

        const success = (response: any) => {
            playlist.items = response.items;
            this.checkFinished();
        };

        this.requestYT('playlistItems', params, success);
    }

    private listRecent(channel: IChannel): void {
        const params = {
            part: 'snippet',
            channelId: channel.id,
            maxResults: this.recentMaxResults,
            type: 'video',
            order: 'date',
        };

        const success = (response: any) => {
            channel.recents = response.items;
            this.checkFinished();
        };

        this.requestYT('search', params, success);
    }

    private rejectAll(error: Error): void {
        this.loading = false;

        while (this.promiseError.length) {
            const fn = this.promiseSuccess.pop();
            const err = this.promiseError.pop();

            if (err) {
                err(error);
            }
        }
    }

    private resolveAll(): void {
        this.loading = false;

        while (this.promiseError.length) {
            const fn = this.promiseSuccess.pop();
            const err = this.promiseError.pop();

            if (fn) {
                fn(this.channels);
            }
        }
    }

    private checkFinished(): void {
        // não terminado
        const hasUnfinished = !!this.channels.find(c => {
            // se tem playlist sem item ou não tem recentes neste canal
            return !c.playlists || !!c.playlists.find(p => !p.items) || !c.recents;
        });

        if (!hasUnfinished) {
            this.loading = false;
            this.lastReq = new Date();

            // resolve todos que estão esperando
            this.resolveAll();
        }
    }

    private requestYT(path: string, params: IParamsRequestYT, success: (response: any) => void): any {
        const paramsStr = qs.stringify({ ...params, key: this.apiKey });
        const url = `${this.baseUrl}/${path}?${paramsStr}`;
        get(url, (res) => {
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
                this.rejectAll(hasError);
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
                    this.rejectAll(e);
                    wLogger.error(JSON.stringify(e));
                }
            });
        });
        return;
    }

}