# peekaboo-server

:ghost: `peekaboo-server` is a reverse proxy for test doubles, for easily stub whole the backend.  

Inspired by [polly.js](https://netflix.github.io/pollyjs), [anyproxy](https://anyproxy.io/), [mitmproxy](https://mitmproxy.org/), [mockserver](https://www.mock-server.com/), [wiremock](http://wiremock.org/), [lightproxy](https://github.com/alibaba/lightproxy), Google Chrome DevTools Network panel and maybe more.  
Batteries included.

# WORK IN PROGRESS

## Quick start

```bash
npm i -g peekaboo-server
peekaboo-server
```

or with docker

```bash
docker run braces/peekaboo-server:latest @todo
```

then the cache server is ready

```bash
curl ... @todo
```

## UI

When server is running, it provide its ui interface at `/`

@todo screenshot

## Settings

@todo

use custom settings for my-app.js

```bash
peekaboo-server --settings my-app.js
```

load custom settings from my-app.js and override at runtime

```bash
APP_PORT=9123 LOG_LEVEL=debug peekaboo-server --settings my-app.js
```

APP_PORT default 8080
LOG_LEVEL default warn
LOG_PRETTY default false
RELAY_TIMEOUT default 20000

## https

@todo

## Development

for server

```bash
npm start
```

for ui

```bash
cd src/ui
npm run serve
```

---

## License

The MIT License (MIT)

Copyright (c) 2020 [Simone Sanfratello](https://braceslab.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
