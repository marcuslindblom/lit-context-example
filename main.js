import {html, css, LitElement} from 'lit';
import {Router} from '@lit-labs/router';
import {ContextProvider, ContextConsumer } from '@lit-labs/context';
import { createContext } from '@lit-labs/context';

const appContext = createContext('app-context');

class Home extends LitElement {
  render() {
    return html`<h1>Hello</h1><a href="/">Home</a> <a href="/about">About</a>`;
  }
}

customElements.define("home-index", Home);

class About extends LitElement {
  consumer = new ContextConsumer(this, {
    context: appContext,
    callback:  ({ name, timeStamp }) => {
      this.name = name;
      this.timeStamp = timeStamp;
    },
     subscribe: true,
  });
  static properties = {
    name: { type: String },
    timeStamp: { type: Number }
  };
  constructor() {
    super();
    this.name = null;
    this.timeStamp = null;
  }
  render() {
    return html`<h1>About ${this.name} / ${new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(this.timeStamp)}</h1><a href="/">Home</a> <a href="/about">About</a>`;
  }
}
customElements.define('about-index', About);

class App extends LitElement {
  provider = new ContextProvider(this, {
    context: appContext,
    initialValue: {
      name: 'Marcus',
      timeStamp: Date.now()
    }
  });
  router = new Router(this, [
    {
      path: '/',
      render: () => html`<home-index></home-index>`,
    },
    {
      path: '/about',
      render: () => html`<about-index></about-index>`,
    }
  ]);
  constructor() {
    super();

    setInterval(() => {
      this.provider.setValue({
        ...this.provider.value,
        timeStamp: Date.now(),
      });
    }, 3000);
  }
  render() {
    return html`${this.router.outlet()}`;
  }
}

customElements.define('my-app', App);
