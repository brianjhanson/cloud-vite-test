import { Modu, ModuOptions } from '@malven/modu';

/**
 * Nicely transitions images via lazy sizes hooks. Applies a class to the parent of a lazy loaded image when that image has been successfully loaded.
 */

export default class extends Modu {
  selectors = ['.image', '.image-video'];

  readyClass = 'is-ready';

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    this.addEventListeners();
  };

  watchImages = (parentEl: HTMLElement) => {
    parentEl.querySelectorAll('img').forEach((el) => {
      const imgEl = el as HTMLImageElement;
      this.watchImage(imgEl);
    });
  };

  watchImage = (imgEl: HTMLImageElement) => {
    if (imgEl.complete) {
      // Image was already loaded
      this.makeParentVisible(imgEl);
    } else {
      imgEl.addEventListener('load', () => {
        // Image was loaded after the page loaded
        this.makeParentVisible(imgEl);
      });
    }
  };

  addEventListeners = () => {
    // Add listeners to existing items
    this.watchImages(document.body);

    // Watch for new items
    const callback = (mutationsList: MutationRecord[]) => {
      // Look through all mutations that just occured
      for (const mutation of mutationsList) {
        // If the mutation was the addition of nodes
        if (mutation.type === 'childList') {
          // Check each added node
          for (const node of Array.from(mutation.addedNodes)) {
            if (node instanceof HTMLElement) {
              this.watchImages(node as HTMLElement);
            }
          }
        }
      }
    };

    // Create a new observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the document with the configured parameters
    observer.observe(document, { childList: true, subtree: true });

    // Handle video playback
    document.querySelectorAll('.video').forEach((el) => {
      const videoEl = el as HTMLVideoElement;
      // If video is already playing, reveal it, otherwise wait for it to start playing
      if (!videoEl.paused && !videoEl.ended && videoEl.readyState > 2) {
        this.makeParentVisible(videoEl);
      } else {
        videoEl.addEventListener('playing', (_evt) => {
          window.setTimeout(() => {
            this.makeParentVisible(videoEl);
          }, 300);
        });
      }
    });

    // Handle vimeo video
    this.on('ImageVideo', 'vimeoPlay', (el: HTMLElement | unknown) => {
      if (!(el instanceof HTMLElement)) return;
      this.makeParentVisible(el);
    });
  };

  makeParentVisible = (el: Element) => {
    this.selectors.forEach((selector) => {
      const parentEl = el.closest(selector);
      if (parentEl) {
        parentEl.classList.add(this.readyClass);
      }
    });
  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
