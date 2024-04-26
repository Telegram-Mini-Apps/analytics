import {EventAttributes} from "../interfaces/event-attributes.interface";

const ANALYTICS_STORAGE = window.localStorage;
const URL = 'http://localhost:3000/'

// async function createToken(telegramUID: string){
//     return await fetch(URL+'token',{
//         method: 'POST',
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             telegramUID: telegramUID,
//         })
//     })
// }
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