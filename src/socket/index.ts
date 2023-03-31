/** @format */
import { Emitter } from '@/utils/emitter';
import { SocketPool, SocketPoolEvent } from '@/socket/socket-pool';

export const MessageCenterEvent = {
  System: {
    Logined: 'System.Logined',
    LoginError: 'System.LoginError',
    Reconnecting: 'System.Reconnecting',
    Reconnected: 'System.Reconnected',
    Disreconnect: 'System.Disreconnect',
    ReconnectFailed: 'System.ReconnectFailed',
  },
  Message: {
    Notice: 'Message.Notice',
    Update: 'Message.Update',
    Will: 'Message.Will',
    Failed: 'Message.Failed',
    Chat: 'Message.Chat',
    Sync: 'Message.Sync',
    Read: 'Message.Read',
  },
  Order: {},
};

export class MessageCenterFactory extends Emitter {
  logined = false;
  socketPool: SocketPool;

  constructor() {
    super();
    this.socketPool = new SocketPool(this.receive);
  }

  connect = () => {
    this.logined = false;
    this.socketPool.connect();
  };
  destroy = () => {
    this.clear();
    this.socketPool.close();
  };

  receive = (type: SocketPoolEvent, res) => {
    console.log(`[MessageCenter] receive[${SocketPoolEvent[type]}]`, res);
    switch (type) {
      case SocketPoolEvent.message:
        return this.fire(MessageCenterEvent.Message.Chat, res);

      case SocketPoolEvent.connected:
      case SocketPoolEvent.reconnected:
        // log.success({ step: '重连成功', MessageId: '' });
        this.fire(MessageCenterEvent.System.Reconnected);
        break;
      // return this.login();
      case SocketPoolEvent.error:
        return this.fire(MessageCenterEvent.System.LoginError, res);
      case SocketPoolEvent.close:
        this.logined = false;
        return this.fire(MessageCenterEvent.System.Disreconnect);

      case SocketPoolEvent.reconnecting:
        this.logined = false;
        return this.fire(MessageCenterEvent.System.Reconnecting);

      case SocketPoolEvent.reconnect_failed:
        this.logined = false;

        // log.error({ step: '重连失败', MessageId: '' });
        return this.fire(MessageCenterEvent.System.ReconnectFailed);
    }
  };
}
export const MessageCenter = new MessageCenterFactory();
