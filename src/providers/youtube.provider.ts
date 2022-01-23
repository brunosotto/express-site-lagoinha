import { get } from 'https';
import * as qs from 'querystring';
import { wLogger } from '../shared/logger';
import jsonfile from 'jsonfile';

//  Models
import { IParamsRequestYT } from './../models/params-request-yt.model';
import { IChannel } from './../models/channel.model';
import { IPlaylist } from './../models/playlist.model';


// Constantes
const USING_MOCK_DB = (process.env.USE_MOCK_DB || '').toLowerCase();
const TIMEOUT_REQ_LAGOINHA = 8 * 60 * 60 * 1000; // 8 horas
const DB_FILE_PATH = 'src/providers/youtube.mock.json';
const API_KEY = 'AIzaSyCqTDq1Envdq1czGv6CcCNu09LhHwSfB7k';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';
const RECENT_MAX_RESULTS = 6;
const PLAYLIST_MAX_RESULTS = 12;
const PLAYLIST_ITEMS_MAX_RESULTS = 3;

export class YouTubeProvider {

    public channelKeys = ['UC-A4tH3VNuty6SjZqO9vtfw', 'UCJzDLUYpybKcK5FkZlSQVZQ'];
    public channels: IChannel[] = [];

    private loadingChannels: IChannel[] = [];

    constructor() {
        this.initialize();
    }

    private async initialize(): Promise<void> {
        if (USING_MOCK_DB && USING_MOCK_DB === 'true') {
            this.channels = await this.readMock();
            return;
        }

        // lista os canais imediatamente e também agenta o interval
        this.listChannels();
        setInterval(_ => {
            this.listChannels();
        }, TIMEOUT_REQ_LAGOINHA);
    }

    private readMock(): Promise<any> {
        return jsonfile.readFile(DB_FILE_PATH);
    }

    private listChannels(): void {
        this.loadingChannels = [];

        const params = {
            part: 'snippet',
            id: this.channelKeys.join(),
        };

        const success = (response: any) => {
            response.items.forEach((channel: IChannel) => {
                this.listPlaylists(channel);
                this.listRecent(channel);
            });
            this.loadingChannels.push(...response.items);
        };

        this.requestYT('channels', params, success);
    }

    private listPlaylists(channel: IChannel): void {
        const params = {
            part: 'snippet',
            channelId: channel.id,
            maxResults: PLAYLIST_MAX_RESULTS,
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
            maxResults: PLAYLIST_ITEMS_MAX_RESULTS,
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
            maxResults: RECENT_MAX_RESULTS,
            type: 'video',
            order: 'date',
        };

        const success = (response: any) => {
            channel.recents = response.items;
            this.checkFinished();
        };

        this.requestYT('search', params, success);
    }

    private checkFinished(): void {
        // não terminado
        const hasUnfinished = !!this.loadingChannels.find(c => {
            // se tem playlist sem item ou não tem recentes neste canal
            return !c.playlists || !!c.playlists.find(p => !p.items) || !c.recents;
        });

        if (!hasUnfinished) {
            // no complete passa a lista nova
            this.channels = this.loadingChannels;
        }
    }

    private requestYT(path: string, params: IParamsRequestYT, success: (response: any) => void): any {
        const paramsStr = qs.stringify({ ...params, key: API_KEY });
        const url = `${BASE_URL}/${path}?${paramsStr}`;
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

    public lastPublishedAt() {

        const lastPublished = this.channels.map((channel) => {
            return channel.recents[0].snippet.publishedAt;
        });
        const data = lastPublished.sort().pop();
        return data;
    }

}
