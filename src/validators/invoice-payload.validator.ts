import { InvoicePayload } from "../declarations/invoice-payload.interface";

export function validateInvoicePayload(payload: any): asserts payload is InvoicePayload {
    if (!payload) {
        throw new Error('Payload is required');
    }

    const requiredStringFields: Array<keyof InvoicePayload> = ['slug', 'title', 'description', 'payload', 'currency'];

    for (const field of requiredStringFields) {
        if (!payload[field] || typeof payload[field] !== 'string') {
            throw new Error(`Field "${field}" is required and must be a string`);
        }
    }

    if (!Array.isArray(payload.prices) || payload.prices.length === 0) {
        throw new Error('Field "prices" must be a non-empty array');
    }

    for (const price of payload.prices) {
        if (!price.label || typeof price.label !== 'string') {
            throw new Error('Each price must have a "label" string');
        }
        if (typeof price.amount !== 'number' || price.amount <= 0) {
            throw new Error('Each price must have a positive "amount" number');
        }
    }

    const optionalNumberFields: Array<keyof InvoicePayload> = [
        'subscription_period', 'max_tip_amount', 'photo_size', 'photo_width', 'photo_height'
    ];
    for (const field of optionalNumberFields) {
        if (field in payload && typeof payload[field] !== 'number') {
            throw new Error(`Field "${field}" must be a number if provided`);
        }
    }

    if ('suggested_tip_amounts' in payload) {
        if (!Array.isArray(payload.suggested_tip_amounts)) {
            throw new Error('Field "suggested_tip_amounts" must be an array if provided');
        }
        for (const amount of payload.suggested_tip_amounts) {
            if (typeof amount !== 'number') {
                throw new Error('All values in "suggested_tip_amounts" must be numbers');
            }
        }
    }

    const optionalBooleanFields: Array<keyof InvoicePayload> = [
        'need_name', 'need_phone_number', 'need_email', 'need_shipping_address',
        'send_phone_number_to_provider', 'send_email_to_provider', 'is_flexible'
    ];

    for (const field of optionalBooleanFields) {
        if (field in payload && typeof payload[field] !== 'boolean') {
            throw new Error(`Field "${field}" must be a boolean if provided`);
        }
    }
}
