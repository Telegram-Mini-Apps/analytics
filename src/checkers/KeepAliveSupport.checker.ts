export class KeepAliveSupportChecker {
    public static isSupported() {
        try {
            const response = fetch('https://tganalytics.xyz/', {
                keepalive: true,
            });

            return true;
        } catch (err) {
            return false;
        }
    }
}