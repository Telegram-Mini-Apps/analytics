import {EventAttributes} from "../interfaces/event-attributes.interface";

const ANALYTICS_STORAGE = window.localStorage;
const URL = 'http://178.154.225.62:3000/'

async function recordEvent(event_name: string, attributes?: EventAttributes){
    await fetch(URL+'events',{
        method: 'POST',
        headers: {
            "token": ANALYTICS_STORAGE.getItem('analyticsToken') as string,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            event_name: event_name,
            attributes: attributes,
        }),
    })
}

document.addEventListener("DOMContentLoaded",async ()=>{
    await recordEvent('init')
})