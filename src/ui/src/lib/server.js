const websocket = window.location.protocol === 'https:'
  ? 'wss:' : 'ws:'

const port = window.location.port ? ':' + window.location.port : ''

const server = {
  host: `${window.location.protocol}//${window.location.hostname}${port}`,
  realtime: `${websocket}//${window.location.hostname}${port}/realtime`
}

module.exports = server
