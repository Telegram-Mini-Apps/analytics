export {};

declare global{
    interface Window{
        telegramAnalytics: {
            init: Function,
        }
    }
}