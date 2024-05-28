import { App } from '../app'
import { BACKEND_URL } from '../constants'
import { Errors, throwError } from '../errors'
import { KeepAliveSupportChecker } from "../checkers/KeepAliveSupport.checker";

export class NetworkController {
    constructor(app: App) {
        this.appModule = app;

        this.isKeepAliveSupported = KeepAliveSupportChecker.isSupported();
    }

    public init() {
    }

    public async recordEvent(
        event_name: string,
        data?: Record<string, any>,
        attributes?: Record<string, any>,
    ) {
        if (!this.appModule.getApiToken()) {
            throwError(Errors.TOKEN_IS_NOT_PROVIDED);
        }

        if (data?.custom_data) {
            if (!attributes) {
                attributes = data.custom_data;
            } else {
                attributes = Object.assign(data.custom_data, attributes);
            }
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
                custom_data: attributes,
                session_id: this.appModule.getSessionId(),
                user_id: this.appModule.getUserId(),
                app_name: this.appModule.getAppName(),
                is_premium: this.appModule.getUserIsPremium(),
                platform: this.appModule.getPlatform(),
                locale: this.appModule.getUserLocale(),
                start_param: this.appModule.getWebAppStartParam(),
                client_timestamp: String(Date.now()),
            }),
            keepalive: this.isKeepAliveSupported,
        });
    }

    private BACKEND_URL: string = BACKEND_URL;

    private appModule: App;
    private readonly isKeepAliveSupported: boolean;
}
