export class AnalyticsController {
    public init() {
        console.log('init');
    }

    public recordEvent(event_name: string, attributes?: Record<string, string>) {
        console.log('recordEvent', event_name, attributes);
    }
}
