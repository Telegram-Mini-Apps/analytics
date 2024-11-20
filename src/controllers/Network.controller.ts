import { App } from '../app'
import { BACKEND_URL } from '../constants'
import { Errors, throwError } from '../errors'

export class NetworkController {
    private appModule: App;

    private readonly BACKEND_URL: string = BACKEND_URL;

    private readonly responseToParams = async (res: Response)=> {
        const response: Response = res.clone();
        if ((String(response.status)[0] === '2') || (response.status === 429)) {
            const data = await response.json();

            this.appModule.setNewArgs(data['Content']);
        }

        return res;
    };

    private readonly generateHeaders = () => {
        if (this.appModule.taskSolution) {
            return {
                "TGA-Auth-Token": this.appModule.getApiToken(),
                "Content-Type": "application/json",
                "Content": this.appModule.taskSolution,
            }
        }

        return {
            "TGA-Auth-Token": this.appModule.getApiToken(),
            "Content-Type": "application/json",
        }
    }

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
            headers: this.generateHeaders(),
            body: JSON.stringify(data),
        }).then(this.responseToParams, this.responseToParams);
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
            headers: this.generateHeaders(),
            body: JSON.stringify({
                    ...data,
                    event_name: event_name,
                    custom_data: attributes,
                    ...this.appModule.assembleEventSession(),
                }),
        }).then(this.responseToParams, this.responseToParams);
    }
}
