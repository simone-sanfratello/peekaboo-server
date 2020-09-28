const websocket = window.location.protocol === 'https:'
  ? 'wss:' : 'ws:'

const server = {
  host: `${window.location.protocol}//${window.location.hostname}`,
  realtime: `${websocket}//${window.location.hostname}/realtime`
  // @todo fix for development
  // host: 'https://myapp.localhost',
  // realtime: 'wss://myapp.localhost/realtime'
}
module.exports = server
