/** @format */
import { globalConfig } from '@/globalConfig';
import { createMessage, MessageActionEnum } from '@/socket/message';
import { set } from 'immutable';

export enum SocketEvent {
  open,
  message,
  connecting,
  connected,
  reconnecting,
  reconnected,
  reconnect_failed,
  close,
  error,
  ping,
  pong,
}
export class ImWebSocket {
  public connection: any;
  private heartTimer: any;
  private reconnectCount = 0;
  private reconnectTimer: any;
  constructor(public handler) {}

  init = () => {
    this.connection = new WebSocket(
      process.env.APP_ENV === 'development' ? globalConfig.devWsUrl : globalConfig.prodWsUrl,
    );
    let { handler, connection } = this;
    //重新定义各个事件的回调函数
    connection.onmessage = handler(SocketEvent.message);
    connection.onopen = handler(SocketEvent.open);
    connection.onclose = handler(SocketEvent.close);
    connection.onerror = handler(SocketEvent.error);
  };

  connect = () => {
    this.init();
    this.ping();
  };

  close = () => {
    try {
      this.connection.close();
    } catch (e) {
      console.error('[Websocket] catch socket reconnect error:', e);
    }
  };

  send = (message) => {
    try {
      this.connection.send(message);
    } catch (e) {
      console.error('[Websocket] catch socket send error:', e);
    }
  };

  ping = () => {
    try {
      //先清除定时器
      clearInterval(this.heartTimer);
      //每隔一段时间发送一次心跳
      this.heartTimer = setInterval(() => {
        this.send(JSON.stringify(createMessage(MessageActionEnum.heart)));
      }, 10000);
    } catch (e) {
      console.error('[Websocket] catch socket ping error:', e);
      setTimeout(() => {
        this.reconnect();
      }, 5000);
    }
  };

  reconnect = () => {
    this.reconnectCount++;
    this.connect();
  };
}

export const webSocket = new ImWebSocket((type) => {
  switch (type) {
    case SocketEvent.message:
      return (res) => {
        console.log('res', res);
        console.log('message');
      };
    case SocketEvent.open:
      return (res) => {
        webSocket.send(JSON.stringify(createMessage(MessageActionEnum.connect)));
        console.log('res', res);
        console.log('open');
      };
    case SocketEvent.close:
      return (res) => {
        console.log('res', res);
        console.log('close');
      };
    case SocketEvent.error:
      return (res) => {
        console.log('res', res);
        console.log('error');
      };
  }
});
