import {
  LitElement,
  html
} from 'https://unpkg.com/lit-element/lit-element.js?module';

const IMG_LENGTH = 8;

customElements.define(
  'grid-gallery',
  class extends LitElement {
    constructor() {
      super();
      this.setImageIndex();
    }

    setImageIndex() {
      this.largeIndex = Math.floor(Math.random() * IMG_LENGTH);
      if (this.largeIndex >= IMG_LENGTH / 2) {
        this.largeIndex = Math.floor(this.largeIndex / 2);
      }
      this.horizontalIndex = Math.floor(Math.random() * IMG_LENGTH);

      if (this.largeIndex === this.horizontalIndex) {
        this.setImageIndex();
      }
    }

    render() {
      const numArray = [...Array(IMG_LENGTH).keys()];
      return html`
        <div>
          <div class="container">
            ${numArray.map(i => {
              return html`
                <img
                  src="./images/${i}.jpg"
                  class="image ${i === this.largeIndex && 'large'} ${i ===
                    this.horizontalIndex && 'horizontal'}"
                />
              `;
            })}
          </div>
          <link rel="stylesheet" href="./styles.css" type="text/css" />
        </div>
      `;
    }
  }
);
