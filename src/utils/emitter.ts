/**
 * 这是设计模式中的发布订阅模式
 */
class Emitter {
  listens: { [x: string]: Set<any> } = {};

  on(name, fn): any {
    let listen = this.listens[name] || new Set();
    this.listens[name] = listen;

    listen.add(fn);
    return () => listen.delete(fn);
  }
  singleton(name, fn) {
    this.listens[name] = new Set([fn]);
    return () => delete this.listens[name];
  }

  once(name, fn) {
    return this.on(name, (...args) => {
      fn(...args);
      this.off(name, fn);
    });
  }

  off(name, fn?) {
    if (this.listens[name]) {
      if (fn) {
        this.listens[name].delete(fn);
      } else {
        delete this.listens[name];
      }
    }
  }
  fire(name, ...args) {
    let listen = this.listens[name] || [];
    listen.forEach((fn) => fn(...args));
  }
  emit = this.fire;

  clear(name?) {
    if (name) {
      delete this.listens[name];
    } else {
      this.listens = {};
    }
  }
}

export { Emitter };
