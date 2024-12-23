import { App } from './app'

async function init({ token, appName, env = 'PROD'}: {
    token: string,
    appName: string,
    env?: 'STG' | 'PROD',
}){
    const app = new App(token, appName, env);
    app.init()
}

export default {
    init,
};
