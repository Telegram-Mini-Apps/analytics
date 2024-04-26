# Miniapps analytisc
### Version 0.0.1
Miniapps analytics is an SDK that allows owners of Telegram web applications to receive analytics about consumer actions of their miniapp.

## Installation
1. Add the script tag to your html head
```html
<script src="https://unpkg.com/miniappsanalytics@latest/dist/src/index.js" type="text/javascript"></script>
```
![Image alt](https://github.com/analyticstg/docsimages/raw/main/tagscript.jpg)
2. Start a conversation with a bot that will give you a unique identifier (https://t.me/analyticsminiapps_bot or @analyticsminiapps_bot)
Example:
![Image alt](https://github.com/analyticstg/docsimages/raw/main/bot.jpg)
3. Initialize the token on your HTML page
```html
<script>
    window.localStorage.setItem('analyticsToken', 'YOUR_TOKEN')
</script>
```
Example:
![Image alt](https://github.com/analyticstg/docsimages/raw/main/settokenexample.jpg)

## Result

As a result, after initializing your webapp, the statistics will record that the user has opened a miniapp
![Image alt](https://github.com/analyticstg/docsimages/raw/main/result.jpg)
