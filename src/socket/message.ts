import { nanoid } from 'nanoid';
import { USER_INFO } from '@/constants';
import { emitter, EmitterType } from '@/utils/app-emitter';
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
  chatMsg: ChatMsg | undefined;
  extend: string;
}

export interface ChatMsg {
  senderId: string;
  receiverId: string;
  dialogId?: string;
  content: string;
  msgId: string;
  chatType: MessageChatTypeEnum;
  messageType: MessageChatMessageTypeEnum;
}

// 消息接收类型
export enum ReceiveType {
  ack = 1, //消息回执
  chat = 2, //聊天消息
  pong = 3, //心跳回执
  notice = 4, //通知消息
}

// 创建文本消息
export function createTextMsg(toUserId: string, content: string, dialogId?: string) {
  let userInfo: any = localStorage.getItem(USER_INFO) || '{}';
  userInfo = JSON.parse(userInfo);
  const msg: ChatMsg = {
    senderId: userInfo?.id + '',
    receiverId: toUserId,
    content: content,
    dialogId: dialogId,
    msgId: nanoid(),
    chatType: MessageChatTypeEnum.single,
    messageType: MessageChatMessageTypeEnum.text,
  };
  return createMessage(MessageActionEnum.chat, msg);
}

// 创建消息
export function createMessage(type: MessageActionEnum, content?: ChatMsg, extend?: string): Message {
  let userInfo: any = localStorage.getItem(USER_INFO) || '{}';
  userInfo = JSON.parse(userInfo);
  switch (type) {
    case MessageActionEnum.chat:
      return {
        action: MessageActionEnum.chat,
        chatMsg: content,
        extend: extend || '',
      };
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

// 接收消息
export function receiveMessage(receiveMsg: any) {
  console.log('接收到消息', receiveMsg);
  switch (receiveMsg.dataType) {
    case ReceiveType.ack:
      console.log('消息回执');
      break;
    case ReceiveType.chat:
      emitter.fire(EmitterType.receiveMsg + receiveMsg?.dialogId, receiveMsg);
      console.log('聊天消息');
      break;
    case ReceiveType.notice:
      console.log('通知消息', receiveMsg);
      emitter.fire(EmitterType.addNotification, receiveMsg?.notifyVO);
      // console.log('通知消息');
      break;
    case ReceiveType.pong:
      console.log('心跳回执');
      break;
  }
}
