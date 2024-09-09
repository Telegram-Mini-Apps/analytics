# Telegram Analytics

Telegram analytics is a unique SDK and API that turns your mini-application into a source of valuable data. Telegram analytics doesn't just track user activity in your app, it turns it into clear and useful analytics. With this tool, you get instant access to key metrics that help you understand how users interact with your application and what steps need to be taken to optimize it.

---

### [Documentation](https://docs.tganalytics.xyz)

# Getting started

## Installation with cdn

### Add Telegram Analytics script to HTML head

```javascript
<script async src="https://tganalytics.xyz/index.js" type="text/javascript"></script>
```

### Alternative solution (not recommended)

```javascript
<script async src="https://unpkg.com/@telegram-apps/analytics@latest/dist/index.js" type="text/javascript"></script>
```

### Initialize the Telegram Mini Apps Analytics SDK

```javascript
window.telegramAnalytics.init({
    token: 'YOUR_TOKEN',
    appName: 'APP_NAME',
});
```

# Installation with npm

## Install the npm package

```npm install @telegram-apps/analytics```

### Initialize the Telegram Mini Apps Analytics SDK

To ensure that all events are collected, initialize the SDK before your application starts rendering

```javascript
import telegramAnalytics from '@telegram-apps/analytics'

telegramAnalytics.init({
    token: 'YOUR_TOKEN',
    appName: 'APP_NAME',
});
```