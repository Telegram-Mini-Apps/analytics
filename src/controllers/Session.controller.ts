import { retrieveLaunchParams, User } from '@telegram-apps/sdk';
import { App } from '../app'
import { Errors, throwError } from '../errors'
import { generateUUID } from '../utils/generateUUID';

export class SessionController {
    private sessionId: string;
    private userId: number;
    private userData: User;
    private platform: string;
    private webAppStartParam: string;
    private userLocale: string;

    private appModule: App;

    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
        const lp = retrieveLaunchParams();
        const user = lp.tgWebAppData.user
        if (!user) {
            throwError(Errors.USER_DATA_IS_NOT_PROVIDED);
        }

        this.userData = {
            id: user.id,
            is_premium: user.is_premium,
            first_name: user.first_name,
            is_bot: user.is_bot,
            last_name: user.last_name,
            language_code: user.language_code,
            photo_url: user.photo_url,
            username: user.username,
        };
        this.userId = user.id;
        this.userLocale = user.language_code;
        this.webAppStartParam = lp.tgWebAppStartParam;
        this.platform = lp.tgWebAppPlatform;
        this.sessionId = generateUUID(String(this.getUserId()));
    }

    public getSessionId() {
        return this.sessionId;
    }

    public getUserId() {
        return this.userId;
    }

    public getWebAppStartParam() {
        return this.webAppStartParam;
    }

    public getPlatform(){
        return this.platform;
    }

    public getUserLocale() {
        return this.userLocale;
    }

    public getUserData() {
        return this.userData;
    }

    public getUserIsPremium() {
        const userData = this.getUserData();

        return Boolean(userData?.is_premium);
    }

    public assembleEventSession() {
        return {
            session_id: this.getSessionId(),
            user_id: this.getUserId(),
            app_name: this.appModule.getAppName(),
            is_premium: this.getUserIsPremium(),
            platform: this.getPlatform(),
            locale: this.getUserLocale(),
            start_param: this.getWebAppStartParam(),
            client_timestamp: String(Date.now()),
        }
    }
}
