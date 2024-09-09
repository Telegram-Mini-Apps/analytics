import { App } from './app'

async function init({ token, appName }: {
    token: string,
    appName: string,
}){
    const app = new App(token, appName);
    app.init()
}

export default {
    init,
};
