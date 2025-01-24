# Telegram Analytics

## Overview

Telegram Analytics is a powerful SDK and API that enables your mini-application to become a rich source of actionable data. By tracking user activity within your app, it transforms that data into clear, useful analytics that can help you optimize your application and enhance user engagement.

### ⚠️ **Disclaimer**

> The library does not collect or store any private user data. It tracks app launches, TON Connect interactions, and GDPR-compliant events in an anonymous format. This data is used solely for to rank applications in the catalog based on their performance and Streaks.

## 🖥️ Environment Support

- Modern browsers
- Server-side Rendering
- [All known](https://telegram.org/apps) Telegram clients

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="iOS" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \>= 79 | \>= 78 | \>= 73 | \>= 12.0 | \>= 12.0                                                                                                                                                                                                        |

## Resources

- **Example Mini App:** Typescript version — [dapp](https://github.com/Dimitreee/demo-dapp-with-analytics).
- **Docs:** Access latest docs at [gitbook](https://docs.tganalytics.xyz/).

## Installation

### Using CDN

To add the Telegram Analytics SDK via CDN, include the following script in your HTML head:

```html
<script async src="https://tganalytics.xyz/index.js" type="text/javascript"></script>
```

### Using npm

You can install the package via npm:

```sh
npm install @telegram-apps/analytics
```

```sh
yarn add @telegram-apps/analytics
```

```sh
pnpm add @telegram-apps/analytics
```

## Usage

> [!IMPORTANT]
>First of all, you must generate an access token through the [Data Chief](https://t.me/DataChief_bot) bot. For detailed instructions on how to connect SDK and receive a token, please refer to the [documentation](https://docs.tganalytics.xyz/).

### Initialize the SDK

After installation and token generation, you need to initialize the SDK before your application starts rendering:

```javascript
import telegramAnalytics from '@telegram-apps/analytics';

telegramAnalytics.init({
    token: 'YOUR_TOKEN',
    appName: 'APP_NAME',
});
```

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Contributions are welcome! To contribute, fork the repository, make your changes, and submit a pull request. We look forward to your innovative [ideas](https://github.com/Telegram-Mini-Apps/TelegramAnalytics/pulls) and improvements.

## License

This Telegram Analytics SDK is available under the [MIT License](https://opensource.org/license/mit). Feel free to use it in both personal and commercial projects.

The library was expertly developed by [sorawalker](https://github.com/sorawalker), with generous support from [TON Foundation](https://github.com/ton-society/grants-and-bounties/).
