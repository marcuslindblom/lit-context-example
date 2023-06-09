import { LitElement, html } from "https://cdn.skypack.dev/lit@2.2.4";
import { Router } from "https://cdn.skypack.dev/@lit-labs/router@0.0.2";


class Home extends LitElement {
  render() {
    return html`<h1>Hello</h1><a href="/">Home</a> <a href="/about">About</a> <a href="/contact">Contact</a>`;
  }
  createRenderRoot() {
    return this;
  }
}

customElements.define("home-index", Home);

class About extends LitElement {
  render() {
    return html`<h1>About ${this.name}</h1><a href="/">Home</a> <a href="/about">About</a> <a href="/contact">Contact</a>`;
  }
  createRenderRoot() {
    return this;
  }  
}

customElements.define('about-index', About);

class Contact extends LitElement {
  static properties = {
    name: { type: String }
  };  
  constructor() {
    super();
    this.name = null;
  }  
  render() {
    return html`<h1>Contact</h1><a href="/">Home</a> <a href="/about">About</a> <a href="/contact">Contact</a>`;
  }
  
  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this.handleClose);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this.handleClose);
    this.name = null;
    super.disconnectedCallback();
  }  
  
  handleClose = (e) => {
    console.log(this);
  }; 
}

customElements.define('contact-index', Contact);

class App extends LitElement {
  router = new Router(this, [
    {
      path: '/',
      render: () => html`<home-index></home-index>`,
    },
    {
      path: '/about',
      render: () => html`<about-index .name=${this.name}></about-index>`,      
    },
    {
      path: '/contact',
      render: () => html`<contact-index></contact-index>`,      
    }    
  ]);
  static properties = {
    name: { type: String }
  };
  constructor() {
    super();
    this.name = 'Marcus';
  }
  render() {
    return html`${this.router.outlet()}`;
  }
  createRenderRoot() {
    return this;
  }  
}

customElements.define('my-app', App);
