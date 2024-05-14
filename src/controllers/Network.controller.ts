import { App } from '../app'
import { BACKEND_URL } from '../constants'
import { Errors, throwError } from '../errors'

export class NetworkController {
    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
    }

    public async recordEvent(
        event_name: string,
        data?: Record<string, string>,
        attributes?: Record<string, string>,
    ) {
        if (!this.appModule.getApiToken()) {
            throwError(Errors.TOKEN_IS_NOT_PROVIDED);
        }

        await fetch(this.BACKEND_URL+'events',{
            method: 'POST',
            headers: {
                "TGA-Auth-Token": this.appModule.getApiToken(),
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                ...data,
                event_name: event_name,
                attributes: attributes,
                session_id: this.appModule.getSessionId(),
                user_id: this.appModule.getSaltedUserId(),
                app_name: this.appModule.getAppName(),
            }),
        })
    }

    private BACKEND_URL: string = BACKEND_URL;
    private TOKEN: string;

    private appModule: App;
}
