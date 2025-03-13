export default class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, listener) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(listener);
  }

  emit(event, payload = null) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((listener) => listener(event, payload));
    }
  }
}
