# Bug

curl 'https://illimity.localhost/url/https://login-uat-api.illimity.com/ctkip/services/CtkipService' -X POST -H 'x-ma-pid: 4a7300bd3f23535483b4becaeb010adc' -H 'x-ma-bid: cf047fad04fe91646fd3c9ac7248021c' -H 'accept: */*' -H 'soapaction: processClientMessage' -H 'x-ma-sid: d1c0f25bc981ff4fa6d8245bd8d46123' -H 'accept-encoding: gzip, deflate, br' -H 'x-ma-hostname: uat-retail.illimity.com' -H 'accept-language: en-us' -H 'cache-control: no-cache' -H 'content-length: 1554' -H 'user-agent: wsdl2objc' -H 'connection: keep-alive' -H 'content-type: text/xml; charset=utf-8' -H 'cookie: incap_ses_476_2062663=rJz0b6EDOAkYHVugrRebBmKVdF8AAAAAIEqCA9jNBYEuLP2a/U5jrA==; incap_ses_476_2053670=FxDtXu/CVwU/HFugrRebBmGVdF8AAAAAyJm7Yq5Lwe+rPAEcfn8mJQ==; icib=cf047fad04fe91646fd3c9ac7248021c; TS01319900=01dca142f8c8b905e53c8d0e5cbac9c289db63c6361defefd066de74e7110e461801bce7f8fa19d263ec75ebd1984bc9483c15f603; lb_cookie=rd9o00000000000000000000ffff0a0a08c9o8443; incap_ses_476_2052273=0fg3DTdo9xSmgFqgrRebBoOUdF8AAAAAAzi0fXIzTwDEgP+XSotOgw==; nlbi_2052273=CwXdLlkf9WIstBcxY3M5RwAAAADprUTs1xdHQs9XqQS/772p; nlbi_2053670=ovsQckO522Fy0Gfpm5F2PAAAAADZ0X1xxUWRoZagU2wehDaW; nlbi_2062663=eViIeY8Adgw4/UeiKQcVLQAAAADSY936G7yHge/jjnXX7yrM; visid_incap_2052273=1WCnSgcuQWe7zH/g04VmfRjocl8AAAAAQUIPAAAAAADlylwHnuZ+zkJRzvB48bLB; visid_incap_2053670=W9gSfc9NRBSDqVL9zbAptWDncl8AAAAAQUIPAAAAAAAiGrH5XRIL/yyE4CaFh7ld; visid_incap_2062663=TrNa0YChTKOWAcLh+eWF+V/ncl8AAAAAQUIPAAAAAADJT11G2NuZhbhfOEGAEFRU' --compressed

# TODO

- doc
  - [x] mode
  - [ ] ui settings
    - [ ] hostname, port, cert ...
  - [ ] docker
  - [ ] howto https
    - create alias for localhost
    - mkcert "alias"

- test suite for server (no ui)
  - [x] bin
    - start with default
    - load .peekaboo-server.js if no --settings
    - load custom

- refactor
  - settings functions, make pure
  - cache summary, use meta files (+fastify-peekaboo)

- features
  - [ ] separate meta from data in storage (in `fastify-peekaboo`)
  - [ ] api for storage summary (meta)
  - [ ] paginate dashboard history
  - [ ] binary request and response
  - [ ] view and edit settings on ui
  - [ ] improve ui (loader, pagination ...)
  - [ ] env settings, check, fix
    - example: hostname not in /etc/hosts > create; cert not present > create, run mkcert
  - [ ] partial match and index

- publish
  - [ ] jsdoc
  - [ ] github (readme)

## FIX

- [ ] ui one call for fetch request and response
- [ ] trim cookies chars https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie in lib/http/adjustCookies
- [ ] ui paginate history

## ROADMAP

- setup script (install mkcert, patch /etc/hosts, different os)
- docker
- electron

## NEXT

- [ ] recipes: graphql
