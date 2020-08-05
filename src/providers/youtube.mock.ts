import jsonfile from 'jsonfile';

export class YoutubeMock {

    private readonly dbFilePath = 'src/providers/youtube.mock.json';

    constructor() {
        //
    }

    public read(): Promise<any> {
        return jsonfile.readFile(this.dbFilePath);
    }
}
