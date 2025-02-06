import { Modu, ModuOptions } from '@malven/modu';

/**
 * Tool for assisting with debugging reveal transitions.
 */

export default class extends Modu {
  timeout?: number;

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    // CTRL+R to toggle grid visibility
    document.addEventListener('keypress', (evt) => {
      if (evt.ctrlKey && evt.key === 'r') {
        document.querySelectorAll('.is-visible').forEach((el) => {
          // Add a style element to body with a random class name
          const style = document.createElement('style');
          style.innerHTML = `*, *:before, *:after { transition-delay: 0s !important; transition-duration: 0.3s !important; }`;
          document.body.appendChild(style);

          el.classList.remove('is-visible');

          // Remove the style element after a timeout
          window.setTimeout(() => {
            document.body.removeChild(style);

            // After a final timeout, re-add the is-visible class
            // eslint-disable-next-line max-nested-callbacks
            window.setTimeout(() => {
              el.classList.add('is-visible');
            }, 500);
          }, 10);
        });
      }
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
