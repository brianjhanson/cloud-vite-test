import { ModuOptions } from '@malven/modu';
import SliderCore from './SliderCore';
import { Options } from '@splidejs/splide';

/**
 * Basic example of slider. Rename and reuse.
 */

export default class extends SliderCore {
  options: Options;

  constructor(m: ModuOptions) {
    super(m);

    const options = JSON.parse((this.getData('options') as string) ?? '{}');
    this.options = Object.assign(
      {
        // Custom options
      },
      options,
    );
  }

  init = () => {
    const slideCount = this.getAll('slide').length;
    if (slideCount < 2) return;

    // Get slider
    this.slider = this.getSlider(this.el, this.options);

    super.init();
  };
}
