import {EventAttributes} from "./interfaces/event-attributes.interface";


const BACKEND_URL: string = 'http://localhost:3000/'
let TOKEN_ANALYTICS: string;

(function (window: Window) {
    async function recordEvent(event_name: string, attributes?: EventAttributes){
        await fetch(BACKEND_URL+'events',{
            method: 'POST',
            headers: {
                "token": TOKEN_ANALYTICS,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                event_name: event_name,
                attributes: attributes,
            }),
        })
    }

    async function init(token: string){
        TOKEN_ANALYTICS = token;
        await recordEvent('init');
    }

    window.telegramAnalytics = {
        init,
    }
})(window);
