/**
 * Creates basic 'waypoint' functionality using the
 * Intersection Observer API.
 *
 * An Intersection Observer polyfill may be necessary
 * in some older browsers:
 *
 * https://caniuse.com/#feat=intersectionobserver
 *
 * @param {Element} el - DOM element to observe
 * @param {object} options - Available options
 * @param {string} options.rootMargin - Margins to apply to the viewport
 * @param {function} options.inHandler - Callback to fire when entering viewport
 * @param {function} options.outHandler - Callback to fire when exiting viewport
 * @param {function} options.atHandler - Callback to fire when fully in viewport
 *
 * @example
 *
 *    import addIntersection from '../utils/addIntersection';
 *
 *    addIntersection(
 *      document.querySelectorAll('.js-foo'),
 *      {
 *        rootMargin: '0px 0px -100px 0px',
 *        inHandler: (el, direction) => {
 *          // Fires when element enters view
 *        },
 *        outHandler: (el, direction) => {
 *          // Fires when element exits view
 *        }
 *      }
 *    );
 */

type Options = {
  rootMargin?: string;
  inHandler?: (
    el: Element,
    direction: string,
    isTriggered: boolean,
    currentRatio: number,
  ) => void;
  outHandler?: (el: Element, direction: string, currentRatio: number) => void;
  atHandler?: (el: Element, direction: string) => void;
  ratioSteps?: number;
};

export default (el: Element, options: Options = {}) => {
  let isTriggered = false;

  const position = {
    previousY: 0,
    previousRatio: 0,
  };

  // Defaults
  const {
    rootMargin = '0px 0px -100px 0px',
    inHandler = (_element, _direction) => null,
    outHandler = (_element, _direction) => null,
    atHandler = (_element, _direction) => null,
    ratioSteps = 20,
  }: Options = options;

  const add = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // If it isn't actually in the viewport, we're not concerned with it
          if (!entry.isIntersecting) return;

          const currentY = entry.boundingClientRect.y;
          const previousY = position.previousY;
          const currentRatio = entry.intersectionRatio;
          const previousRatio = position.previousRatio;

          const dir = currentY < previousY ? 'down' : 'up';

          const status = currentRatio < previousRatio ? 'exiting' : 'entering';

          // Exiting top or bottom
          if (currentRatio <= 1 && status === 'exiting') {
            outHandler.call(undefined, entry.target, dir, currentRatio);
          }

          // Entering top or bottom
          if (currentRatio > 0 && status === 'entering') {
            inHandler.call(
              undefined,
              entry.target,
              dir,
              isTriggered,
              currentRatio,
            );
            isTriggered = true;
          }

          // Fully visible
          if (currentRatio >= 1 && status === 'entering') {
            atHandler.call(undefined, entry.target, dir);
          }

          position.previousY = currentY;
          position.previousRatio = currentRatio;
        });
      },
      {
        rootMargin: rootMargin,
        threshold: Array(ratioSteps + 1)
          .fill(0)
          .map((_, idx) => idx / ratioSteps || 0),
      },
    );

    observer.observe(el);

    return observer;
  };

  return add();
};
