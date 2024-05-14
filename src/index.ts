import { App } from './app'
import { NetworkController } from './controllers/Network.controller'

const BACKEND_URL: string = 'https://tganalytics.xyz/'
let TOKEN: string;

(function (window: Window) {

    async function init({ token, appName }){
        const app = new App(token, appName);
        app.init()
    }

    window.telegramAnalytics = {
        init,
    }
})(window);
