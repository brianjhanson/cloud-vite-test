import { Modu, ModuOptions } from '@malven/modu';

/**
 * Handles settings and visibility for a grid debugging layer.
 */

export default class extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    // CTRL+G to toggle grid visibility
    document.addEventListener('keypress', (evt) => {
      if (evt.ctrlKey && evt.key === 'g') {
        this.el.classList.toggle('is-visible');
      }
    });
  };
}
