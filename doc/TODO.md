# TODO

- doc
  - [ ] mode
  - [ ] settings
  - [ ] docker
  - [ ] howto https
    - create alias for localhost
    - mkcert "alias"

- test suite for server (no ui)
  - [ ] bin
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

- publish
  - [ ] jsdoc
  - [ ] github (readme)
  - [ ] npm peekaboo-server

## FIX

- [ ] one call for fetch request and response
- [ ] trim cookies chars https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie in lib/http/adjustCookies


## NEXT

- [ ] recipes: graphql
