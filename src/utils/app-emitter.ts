/** @format */

import { Emitter } from './emitter';

export enum EmitterType {
  logout,
  updateAnswerList,
  updateCommentList,
  searchQuestion,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
