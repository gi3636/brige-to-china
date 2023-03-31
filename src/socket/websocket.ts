/** @format */
import { globalConfig } from '@/globalConfig';

export class ImWebSocket {
  private _connection: any;
  constructor(public handler) {}

  connect = () => {
    this._connection = new WebSocket(
      process.env.APP_ENV === 'development' ? globalConfig.devWsUrl : globalConfig.prodWsUrl,
    );
    this.listen();
  };

  listen = () => {
    let { handler, _connection } = this;
    _connection.onmessage = function (res) {
      console.log('res', res);
      // const dataAsArray = new Uint8Array(res.data);
      // const msg = IMMessage.decode(dataAsArray);
      // handler(SocketPoolEvent.message)(msg);
    };
    _connection.onopen = handler('open');
    _connection.onclose = handler('close');
    _connection.onerror = handler('error');
  };

  close = () => {
    try {
      this._connection.close();
    } catch (e) {
      console.error('[Websocket] catch socket reconnect error:', e);
    }
  };

  send = (message) => {
    try {
      this._connection.send(message);
    } catch (e) {
      console.error('[Websocket] catch socket send error:', e);
    }
  };
}
