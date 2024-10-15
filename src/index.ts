import { App } from './app'

async function init({ token, appName }: {
    token: string,
    appName: string,
}){
    let isInitialized: boolean = false;

    async function initialize(token: string, appName: string) {
        if (!isInitialized) {
            isInitialized = true;
            const app = new App(token, appName);
            app.init();
        } else {
            console.log('Analytics have already been initialized');
        }
    }

    return initialize(token, appName);
}

export default {
    init,
};
