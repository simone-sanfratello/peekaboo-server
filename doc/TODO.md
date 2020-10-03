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
