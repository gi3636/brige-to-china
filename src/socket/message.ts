import { nanoid } from 'nanoid';
import { USER_INFO } from '@/constants';

export enum MessageType {
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

export enum MessageActionEnum {
  connect = 1,
  chat = 2,
  sign = 3,
  heart = 4,
}

// 消息聊天类型
export enum MessageChatTypeEnum {
  single = 1,
  group = 2,
}

// 消息类型
export enum MessageChatMessageTypeEnum {
  text = 1,
  image = 2,
}
export interface Message {
  action: MessageActionEnum;
  chatMsg: ChatMsg;
  extend: string;
}

export interface ChatMsg {
  senderId: string;
  receiverId: string;
  content: string;
  msgId: string;
  chatType: MessageChatTypeEnum;
  messageType: MessageChatMessageTypeEnum;
}

export function createMessage(type: MessageActionEnum, content?: ChatMsg, extend?: string): Message {
  let userInfo: any = localStorage.getItem(USER_INFO) || '{}';
  userInfo = JSON.parse(userInfo);
  switch (type) {
    case MessageActionEnum.connect:
      return {
        action: MessageActionEnum.connect,
        chatMsg: {
          senderId: userInfo?.id + '',
          receiverId: '',
          content: '',
          msgId: '',
          chatType: 0,
          messageType: 0,
        },
        extend: '',
      };
    case MessageActionEnum.heart:
      return {
        action: MessageActionEnum.heart,
        chatMsg: {
          senderId: userInfo?.id + '',
          receiverId: '',
          content: 'ping',
          msgId: '',
          chatType: 0,
          messageType: 0,
        },
        extend: '',
      };
    default:
      return {
        action: 1,
        chatMsg: {
          senderId: '10001',
          receiverId: '10002',
          content: 'Hello, world!',
          msgId: nanoid(),
          chatType: 1,
          messageType: 1,
        },
        extend: '扩展信息',
      };
  }
}
