const websocket = window.location.protocol === 'https:'
  ? 'wss:' : 'ws:'

const server = {
  host: `${window.location.protocol}//${window.location.hostname}`,
  realtime: `${websocket}//${window.location.hostname}/realtime`
}

module.exports = server
