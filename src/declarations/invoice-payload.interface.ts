export interface InvoicePayload {
    slug: string;
    business_connection_id?: string;
    title: string;
    description: string;
    payload: string;
    provider_token?: string;
    currency: string;
    prices: {
        label: string;
        amount: number;
    }[];
    subscription_period?: number;
    max_tip_amount?: number;
    suggested_tip_amounts?: number[];
    provider_data?: string;
    photo_url?: string;
    photo_size?: number;
    photo_width?: number;
    photo_height?: number;
    need_name?: boolean;
    need_phone_number?: boolean;
    need_email?: boolean;
    need_shipping_address?: boolean;
    send_phone_number_to_provider?: boolean;
    send_email_to_provider?: boolean;
    is_flexible?: boolean;
}