import {EventAttributes} from "./interfaces/event-attributes.interface";

const BACKEND_URL: string = 'http://localhost:3000/'
let TOKEN: string;

(function (window: Window) {
    async function recordEvent(event_name: string, attributes?: EventAttributes){
        await fetch(BACKEND_URL+'events',{
            method: 'POST',
            headers: {
                "token": TOKEN,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event_name: event_name,
                attributes: attributes,
            }),
        })
    }

    async function init(token: string){
        TOKEN = token;
        await recordEvent('init');
    }

    window.telegramAnalytics = {
        init,
    }
})(window);
