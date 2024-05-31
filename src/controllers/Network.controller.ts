import { App } from '../app'
import { BACKEND_URL } from '../constants'
import { Errors, throwError } from '../errors'

export class NetworkController {
    private appModule: App;

    private readonly BACKEND_URL: string = BACKEND_URL;

    constructor(app: App) {
        this.appModule = app;

        if (!this.appModule.getApiToken()) {
            throwError(Errors.TOKEN_IS_NOT_PROVIDED);
        }
    }

    public init() {}

    public async recordEvents(
        data: Record<string, any>[],
    ) {
        return await fetch(this.BACKEND_URL + 'events',{
            method: 'POST',
            headers: {
                "TGA-Auth-Token": this.appModule.getApiToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    }

    public async recordEvent(
        event_name: string,
        data?: Record<string, any>,
        attributes?: Record<string, any>,
    ) {
        if (data?.custom_data) {
            if (!attributes) {
                attributes = data.custom_data;
            } else {
                attributes = Object.assign(data.custom_data, attributes);
            }
        }

        await fetch(this.BACKEND_URL + 'events',{
            method: 'POST',
            headers: {
                "TGA-Auth-Token": this.appModule.getApiToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                event_name: event_name,
                custom_data: attributes,
                ...this.appModule.assembleEventSession(),
            }),
        });
    }
}
