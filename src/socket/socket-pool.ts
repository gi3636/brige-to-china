/** @format */
import { ImWebSocket } from '@/socket/websocket';

export enum SocketPoolEvent {
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
export class SocketPool {
  socket;
  heart_timer;
  first_connect = true;
  error_timer = Date.now();

  recount = 0;
  connected = false;
  reconnecting = false;
  off_reconnect = false;

  ping_count = 0;
  constructor(public handler) {}

  connect() {
    this.recount = 0;
    this.ping_count = 0;
    this.connected = false;
    this.off_reconnect = false;
    this.reconnecting = false;
    console.log('创建');
    try {
      this.stopHeart();
      this.socket.close();
    } catch (e) {
      console.error('[Websocket] catch socket reconnect error:', e);
    }

    this.handler(this.first_connect ? SocketPoolEvent.connecting : SocketPoolEvent.reconnecting);
    this.socket = new ImWebSocket((socketType) => (res) => this.handleEvent(socketType, res));
    this.socket.connect();
  }

  handleEvent(type: SocketPoolEvent, res) {
    switch (type) {
      case SocketPoolEvent.message:
        return this.handler(SocketPoolEvent.message, res);
      case SocketPoolEvent.open:
        this.connected = false;
        this.recount = 0;

        this.handler(
          this.first_connect ? SocketPoolEvent.connected : SocketPoolEvent.reconnected,
          Date.now() - this.error_timer,
        );
        return;
      case SocketPoolEvent.close:
        this.error_timer = Date.now();
        this.handler(SocketPoolEvent.close, res);
        return this.reconnect();
      case SocketPoolEvent.error:
        this.error_timer = Date.now();
        this.handler(SocketPoolEvent.error, res);
        return this.reconnect();
    }
  }

  send(msg) {
    this.socket.send(msg);
  }

  close() {
    this.stopHeart();

    this.first_connect = true;
    this.connected = false;
    this.off_reconnect = true;
    this.socket.close();
  }

  reconnect() {
    this.stopHeart();
    this.first_connect = false;

    if (this.off_reconnect) {
      return console.log('[socketPool][offreconnect] Offreconnect is true, Please try to connect manually');
    }

    if (this.reconnecting) {
      return console.log(`[socketPool][reconnect: ${this.recount}] Trying to reconnect, please wait`);
    }

    let maxRecount = 5;
    if (this.recount >= maxRecount) {
      this.handler(SocketPoolEvent.reconnect_failed);
      return console.log(`[socketPool][failed] Reconnection failed ${maxRecount} times,Please try to connect manually`);
    }

    this.reconnecting = true;
    this.recount += 1;
    this.handler(SocketPoolEvent.reconnecting);

    setTimeout(() => {
      this.socket.close();
      this.socket.connect();
      this.reconnecting = false;
    }, 5e3);
  }

  ping = () => {
    this.startHeart();
  };

  startHeart = () => {
    this.stopHeart();
    this.heart_timer = setTimeout(this.ping, 20e3);
  };

  stopHeart = () => {
    clearTimeout(this.heart_timer);
  };
}
