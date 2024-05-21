import { App } from './app'

(function (window: Window) {
    async function init({ token, appName }){
        const app = new App(token, appName);
        app.init()
    }

    window.telegramAnalytics = {
        init,
    }
})(window);
