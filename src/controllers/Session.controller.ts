import { WebAppUser } from '@twa-dev/types'
import { App } from '../app'
import { Errors, throwError } from '../errors'
import { generateUUID } from '../utils/generateUUID';
import { sha256 } from '../utils/sha256';

export class SessionController {
    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
        this.userData = window?.Telegram?.WebApp?.initDataUnsafe?.user;
        if (!this.userData) {
            throwError(Errors.USER_DATA_IS_NOT_PROVIDED);
        }

        this.sessionId = generateUUID(this.getUserId());
        this.saltedUserId = sha256(this.getUserId() + this.appModule.getApiToken());
    }

    public getSessionId() {
        return this.sessionId;
    }

    public getUserId() {
        return window?.Telegram?.WebApp?.initDataUnsafe?.user?.id;
    }

    public getSaltedUserId() {
        return this.saltedUserId;
    }

    public getUserData() {
        return this.userData;
    }

    private sessionId: string;
    private userId: string;
    private saltedUserId: string;
    private userData: WebAppUser

    private appModule: App;
}
