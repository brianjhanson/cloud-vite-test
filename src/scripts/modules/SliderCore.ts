import { Modu, ModuOptions } from '@malven/modu';
import Splide from '@splidejs/splide';
import type { Options, BaseComponent, Components } from '@splidejs/splide';
import { Intersection } from '@splidejs/splide-extension-intersection';

type EventOptions = {
  beforeMount?: (slider: Splide) => void;
};

type BaseComponentMap = {
  [key: string]: (
    Splide: Splide,
    Components: Components,
    options: Options,
  ) => BaseComponent;
};

/**
 * Core slider functionality
 */

export default class extends Modu {
  slider!: Splide;

  constructor(m: ModuOptions) {
    super(m);
  }

  /**
   * Adds all classes that Splide requires.
   */
  addSliderClasses = () => {
    this.el.classList.add('splide');
    this.get('track')?.classList.add('splide__track');
    this.get('list')?.classList.add('splide__list');
    this.getAll('slide').forEach((slide) =>
      slide.classList.add('splide__slide'),
    );
  };

  /**
   * Get some default options with optional overrides
   */
  getDefaultOptions = (options = {}): Options => {
    const defaults = {
      type: 'loop',
      live: false,
      pagination: false,
      arrowPath: this.getArrowPath(),
      autoplay: true,
      perMove: 1,
      perPage: 1,
      speed: 800,
      interval: 3600,
      waitForTransition: false,
      updateOnMove: true,
      intersection: {},
    };

    const mergedOptions = { ...defaults, ...options };

    // If `autoplay` is enabled we'll rely on splide to handle it
    if (mergedOptions.autoplay) {
      mergedOptions.intersection = {
        inView: {
          autoplay: true,
        },
        outView: {
          autoplay: false,
        },
      };
    }

    return mergedOptions;
  };

  /**
   * Create a new Splide slider instance
   */
  getSlider = (
    el: Element,
    options: Options = {},
    eventOptions: EventOptions = {},
    extensions: BaseComponentMap = {},
  ) => {
    // Add slider classes
    this.addSliderClasses();

    // Create the slider
    const sliderOptions = this.getDefaultOptions(options);
    const slider = new Splide(el as HTMLElement, sliderOptions);

    // Custom events
    if (eventOptions.beforeMount) eventOptions.beforeMount(slider);

    // Mount the slider
    slider.mount({ Intersection, ...extensions });

    // If the slider type is loop we need to re-init Modu on the cloned slides
    if (sliderOptions.type === 'loop') this.app.init(this.el);

    return slider;
  };

  /**
   * Initialize (automatically called by Modu)
   */
  init() {
    this.addEventListeners();
    this.announceSlideCount(0);

    // HACK: Prevent slider from awkwardly re-loading a cloned slide image.
    if (!this.slider.Components.AutoScroll) {
      this.slider.go('>');
      this.slider.go(0);
    }
  }

  /**
   * Listen for events either on the slider instance or on other Modu modules
   */
  addEventListeners = () => {
    // Set connected sliders
    const controlsSliderKey = this.getData('controls-slider-key');
    if (controlsSliderKey && typeof controlsSliderKey === 'string') {
      this.slider.on('move', (newIndex) => {
        ['SliderImage'].forEach((moduleName) => {
          this.call(moduleName, 'setSlide', newIndex, controlsSliderKey);
        });
      });
    }

    // Update slide count
    this.slider.on('move', (newIndex) => {
      this.announceSlideCount(newIndex);

      // Add classes for current slide
      this.setProgressClass(newIndex);
    });

    // Set initial progress class
    this.setProgressClass(0);

    // Listen for a dialog to open and update this slide if the dialog is a parent
    this.on('Dialog', 'open', (dialogEl: unknown) => {
      if (dialogEl instanceof Element) {
        if (dialogEl.contains(this.el)) {
          this.slider.refresh();
        }
      }
    });
  };

  announceSlideCount = (idx: number) => {
    this.call('SlideCount', 'set', [idx, this.getSlideCount()], this.key);
  };

  getSlideCount = () => {
    return this.slider.length;
  };

  setProgressClass = (idx: number) => {
    const slideCount = this.getSlideCount();
    const perPage = this.slider.options.perPage ?? 1;
    this.el.classList.toggle('is-first-slide', idx === 0);
    this.el.classList.toggle(
      'is-last-slide',
      idx + perPage - 1 >= slideCount - 1,
    );
  };

  /**
   * Set the current slide to an index
   */
  setSlide = (idx: number) => {
    this.slider.go(idx);
  };

  /**
   * Get the common arrow SVG path
   */
  getArrowPath = (): string => {
    return 'M25.7457 18.7009L18.3257 11.2809L19.6066 10L29.2132 19.6066L19.6066 29.2132L18.3257 27.9323L25.7457 20.5123H10V18.7009H25.7457Z';
  };

  /**
   * Clean up the Modu module. Automatically called when Modu is destroyed.
   */
  cleanup = () => {
    if (this.slider) this.slider.destroy();
  };
}
