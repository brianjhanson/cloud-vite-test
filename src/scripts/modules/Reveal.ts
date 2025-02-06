import { Modu, ModuOptions } from '@malven/modu';

import addIntersection from '../utils/addIntersection';

/**
 * Handles reveal animations on scroll.
 */

export default class extends Modu {
  visibleClass = 'is-visible';
  observer?: IntersectionObserver;

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    // Enable reveal transitions
    const root = document.getElementsByTagName('html')[0];
    root.className = root.className.replace('preload-transitions', '');
    let triggerEl = this.el;

    // Change the trigger element based on settings
    const trigger = this.getData('trigger');
    if (trigger === 'parent') {
      triggerEl = this.el.parentNode as Element;
    } else if (typeof trigger === 'string') {
      const closestTrigger = this.el.closest(trigger);
      if (closestTrigger) triggerEl = closestTrigger;
    }

    this.observer = addIntersection(triggerEl, {
      rootMargin: '0px 0px -80px 0px',
      inHandler: (el, direction, isAlreadyRevealed) => {
        // Fires when element enters view
        if (!isAlreadyRevealed) {
          this.el.classList.add(this.visibleClass);
        }
      },
    });
  };

  cleanup = () => {
    if (this.observer) this.observer.disconnect();
  };
}
