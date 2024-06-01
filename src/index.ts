import { App } from './app'

async function init({ token, appName }){
    const app = new App(token, appName);
    app.init()
}

export default {
    init,
};
