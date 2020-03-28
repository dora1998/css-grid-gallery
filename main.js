import {
  LitElement,
  html
} from 'https://unpkg.com/lit-element/lit-element.js?module';

const IMG_LENGTH = 8;

customElements.define(
  'grid-gallery',
  class extends LitElement {
    static get properties() {
      return {
        largeIndex: { type: Number },
        horizontalIndex: { type: Number }
      };
    }
    constructor() {
      super();
      this.setImageIndex();
    }

    setImageIndex() {
      this.largeIndex = Math.floor(Math.random() * IMG_LENGTH);
      this.horizontalIndex = Math.floor(Math.random() * IMG_LENGTH);

      // 大きい枠が後ろにくると崩れるため
      if (this.largeIndex >= IMG_LENGTH / 2) {
        this.largeIndex = Math.floor(this.largeIndex / 2);
      }
      // 大きい枠と横長枠が被ったらもう一回やり直す
      if (this.largeIndex === this.horizontalIndex) {
        this.setImageIndex();
      }
    }

    render() {
      const numArray = [...Array(IMG_LENGTH).keys()];
      return html`
        <div class="container" @click="${this.setImageIndex}">
          ${numArray.map(i => {
            const styleClass = ['image'];
            if (i === this.largeIndex) styleClass.push('large');
            if (i === this.horizontalIndex) styleClass.push('horizontal');
            return html`
              <div
                class="${styleClass.join(' ')}"
                style="background-image: url('./images/${i}.jpg');"
              />
            `;
          })}
        </div>
        <link rel="stylesheet" href="./styles.css" type="text/css" />
      `;
    }
  }
);
