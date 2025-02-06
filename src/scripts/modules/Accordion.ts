import { Modu, ModuOptions } from '@malven/modu';

/**
 * A vertically-stacked set of collapsible items.
 *
 * https://www.w3.org/WAI/ARIA/apg/patterns/accordion/
 *
 * @example
 *
 * Example markup:
 *
 * {% set key = 'unique-key-for-group' %}
 * {% set contentKey = key ~ '-content' %}
 *
 * <div class="accordion-group__item" data-module-accordion="{{ key }}">
 *   {# Heading #}
 *   <h4 class="accordion-group__heading">
 *     <button
 *       type="button"
 *       class="accordion-group__heading-button"
 *       aria-controls="{{ contentKey }}"
 *       id="{{ key }}"
 *       data-accordion="button"
 *     >
 *       <span class="accordion-group__heading-text">Title of Group</span>
 *       <span class="accordion-group__heading-icon"></span>
 *     </button>
 *   </h4>
 *
 *   {# Content #}
 *   <div class="accordion-group__content"
 *      id="{{ contentKey }}"
 *      role="region"
 *      aria-labelledby="{{ key }}"
 *      data-accordion="content"
 *   >
 *     <div class="accordion-group__content-inner" data-accordion="content-inner">
 *       <p>Content goes here...</p>
 *     </div>
 *   </div>
 * </div>
 *
 * Important Styles:
 *
 * .accordion-group__content {
 *   transition: max-height 0.5s;
 *   overflow: clip;
 * }
 *
 * .accordion-group__content-inner {
 *   transition: opacity 0.5s;
 * }
 *
 *
 * // ---------------------------------------------------------------
 * // State - Expanding
 * // ---------------------------------------------------------------
 *
 * .js .accordion-group__content:not([aria-hidden = 'false']) {
 *   max-height: 0 !important;
 *
 *   .accordion-group__content-inner {
 *     opacity: 0;
 *   }
 * }
 *
 * .accordion-group__heading-button[aria-expanded = 'true'] {
 *
 * }
 */

export default class extends Modu {
  buttonEl: HTMLElement;
  contentEl: HTMLElement;
  contentInnerEl: HTMLElement;
  isOpen = false;
  resizeObserver?: ResizeObserver;
  contentHiddenClass = 'is-hidden';

  constructor(m: ModuOptions) {
    super(m);

    this.buttonEl = this.get('button') as HTMLElement;
    this.contentEl = this.get('content') as HTMLElement;
    this.contentInnerEl = this.get('content-inner') as HTMLElement;

    // Should other accordions be closed when this one is opened?
    this.closeOthers = (this.getData('close-others') ?? 'false') === 'true';
  }

  init = () => {
    // Set initial state to close
    this.toggle(null, false);

    // Add event listener
    this.buttonEl.addEventListener('click', this.toggle);

    // Initially set content height
    this.updateContentHeight();

    // Create a resize observer to update content height
    this.resizeObserver = new ResizeObserver((_entries) => {
      this.updateContentHeight();
    });
    this.resizeObserver.observe(this.contentInnerEl);
  };

  toggle = (evt: MouseEvent | null, state?: boolean) => {
    // Update the internal state
    this.isOpen = state ?? !this.isOpen;

    // DOM updates
    this.buttonEl.setAttribute('aria-expanded', `${this.isOpen}`);
    this.contentEl.setAttribute('aria-hidden', `${!this.isOpen}`);

    // Toggle focus of content links
    this.contentInnerEl.querySelectorAll('a').forEach((linkEl) => {
      linkEl.setAttribute('tabindex', this.isOpen ? '0' : '-1');
    });

    if (this.isOpen && this.closeOthers) {
      this.call('Accordion', 'close');
    }

    if (this.isOpen) {
      this.emit('open', this.key);
    } else {
      this.emit('close', this.key);
    }
  };

  updateContentHeight = () => {
    this.contentEl.style.maxHeight = this.contentInnerEl.offsetHeight + 'px';
  };

  open = () => {
    this.toggle(null, true);
  };

  close = () => {
    this.toggle(null, false);
  };

  cleanup = () => {
    // Remove listener
    this.buttonEl.removeEventListener('click', this.toggle);

    // Remove resize observer
    if (this.resizeObserver) this.resizeObserver.disconnect();
  };
}
