import { App } from './app'
import { InvoicePayload } from "./declarations/invoice-payload.interface";

let __registerInvoice: (invoicePayload: InvoicePayload) => void;

async function init({ token, appName, env = 'PROD'}: {
    token: string,
    appName: string,
    env?: 'STG' | 'PROD',
}) {
    const app = new App(token, appName, env);

    __registerInvoice = (invoicePayload: InvoicePayload) => {
        app.registerInvoice(invoicePayload);
    }

    await app.init();

    if (typeof window !== 'undefined') {
        window.telegramAnalytics.registerInvoice = __registerInvoice;
    }
}

export default {
    init,
    registerInvoice: (invoicePayload: InvoicePayload) => __registerInvoice(invoicePayload),
};