# Telegram Analytics

## Overview

Telegram Analytics is a powerful SDK and API that enables your mini-application to become a rich source of actionable data. By tracking user activity within your app, it transforms that data into clear, useful analytics that can help you optimize your application and enhance user engagement.

## Features

- **Comprehensive User Activity Tracking:** Gain insights into user interactions within your app, enabling informed decision-making.
- **Actionable Metrics:** Access key performance indicators that highlight user behavior and areas for improvement.
- **Optimization Guidance:** Identify specific steps to enhance user experience based on analytical insights.

## 🖥 Environment Support

- Modern browsers
- Server-side Rendering
- [All known](https://telegram.org/apps) Telegram clients

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="iOS" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br>iOS |
|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| \>= 79 | \>= 78 | \>= 73 | \>= 12.0 | \>= 12.0                                                                                                                                                                                                        |

## Resources

- **Example Mini App:** Typescript version — [Example Mini App](https://github.com/Telegram-Mini-Apps/TGUI-Example)
- **Playground and Storybook:** Explore components and visualize changes in real-time at [Playground and Storybook](https://tgui.xelene.me/).
- **Figma Resources:** Access comprehensive Figma files for design and prototyping at [Figma](https://figma.com/community/file/1348989725141777736/).

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

### Initialize the SDK

After installation, you need to initialize the SDK before your application starts rendering:

```javascript
import telegramAnalytics from '@telegram-apps/analytics';

telegramAnalytics.init({
    token: 'YOUR_TOKEN',
    appName: 'APP_NAME',
});
```

### Example Implementation

Here’s an example of how to use the Telegram Analytics SDK in your application:

```javascript
import telegramAnalytics from '@telegram-apps/analytics';

// Initialize the SDK
telegramAnalytics.init({
    token: 'YOUR_TOKEN',
    appName: 'APP_NAME',
});

// Track an event
telegramAnalytics.track('Event Name', {
    property1: 'value1',
    property2: 'value2',
});
```

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

Contributions are welcome! To contribute, fork the repository, make your changes, and submit a pull request. We look forward to your innovative [ideas](https://github.com/Telegram-Mini-Apps/TelegramAnalytics/pulls) and improvements.

## License

This Telegram Analytics SDK is available under the [MIT License](https://opensource.org/license/mit). Feel free to use it in both personal and commercial projects.

The library was expertly developed by [mainsmirnov](https://github.com/mainsmirnov), with generous support from [TON Foundation](https://github.com/ton-society/grants-and-bounties/issues/364).
