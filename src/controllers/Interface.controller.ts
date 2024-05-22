import { App } from '../app'
import { Events } from '../constants'

export class InterfaceController {
    constructor(app: App) {
        this.appModule = app;
    }

    public init() {
        document.onvisibilitychange = () => {
            if (document.visibilityState === 'hidden'){
                this.recordEvent(Events.HIDE);
            }
        }
    }

    public recordEvent(event_name: string, data?: any) {
        this.appModule.recordEvent(event_name, data).catch(e => console.error(e));
    }

    private appModule: App;
}
