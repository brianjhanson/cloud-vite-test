import { Modu, ModuOptions } from '@malven/modu';

/**
 * Simple component to keep track of current slide.
 */

export default class extends Modu {
  numeratorEl: Element | null;
  denominatorEl: Element | null;

  constructor(m: ModuOptions) {
    super(m);

    this.numeratorEl = this.get('numerator');
    this.denominatorEl = this.get('denominator');
  }

  init = () => {
    // Check for necessary elements
    if (!this.numeratorEl || !this.denominatorEl) {
      return console.error(
        'SlideCount module could not find `numerator` or `denominator` elements.',
      );
    }

    // Zero pad denominator
    this.denominatorEl.innerHTML = this.padNumber(this.denominatorEl.innerHTML);
    this.numeratorEl.innerHTML = this.padNumber(this.numeratorEl.innerHTML);
  };

  set = (idx: number, of?: number) => {
    if (!this.numeratorEl)
      return console.error(
        'SlideCount module could not find `numerator` element.',
      );
    this.numeratorEl.innerHTML = this.padNumber(String(idx + 1));
    if (of && this.denominatorEl)
      this.denominatorEl.innerHTML = this.padNumber(String(of));
  };

  padNumber = (val: string) => {
    const padCount = 0; // Change this to add padding to the number
    return val.padStart(padCount, '0');
  };

  cleanup = () => {
    // Code to run when module is destroyed
  };
}
