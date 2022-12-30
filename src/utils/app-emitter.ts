/** @format */

import { Emitter } from './emitter';

enum EmitterType {
  logout,
}
class AppEmitter extends Emitter {
  type = EmitterType;
}

export const emitter = new AppEmitter();
