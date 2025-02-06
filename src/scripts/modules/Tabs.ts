import { Modu, ModuOptions } from '@malven/modu';

/**
 * Accessible tabbed content
 *
 * https://www.w3.org/WAI/ARIA/apg/example-index/tabs/tabs-automatic.html
 *
 * @example
 *
 * {% include '_partials/tabs' with {
 *   label: 'Important content',
 *   tabs: [
 *      {
 *        label: 'Tab Title',
 *        content: '<p>Some content for the tab</p>',
 *      },
 *   ],
 * } only %}
 *
 * .tabs {
 *   // Behavioral styles = Do not modify these
 *
 *   [role="tab"],
 *   [role="tab"]:focus,
 *   [role="tab"]:hover {
 *     z-index: 2;
 *     overflow: visible;
 *     outline: none;
 *   }
 *
 *   [role="tab"] span.focus {
 *     display: inline-block;
 *   }
 *
 *   [role="tabpanel"] {
 *     overflow: auto;
 *   }
 *
 *   [role="tabpanel"].is-hidden {
 *     display: none;
 *   }
 */

export default class extends Modu {
  tabs: HTMLElement[] = [];
  tabpanels: Element[] = [];
  firstTab: HTMLElement | null = null;
  lastTab: HTMLElement | null = null;
  hidingClass = 'is-hiding';
  hiddenClass = 'is-hidden';
  hideDelay = 500;
  tabSelector = '[role=tab]';
  tablistNode: Element | null = null;
  tablistSelector = '[role="tablist"]';

  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {
    this.tablistNode = this.el.querySelector(this.tablistSelector);
    if (!this.tablistNode) return;

    this.tabs = Array.from(this.tablistNode.querySelectorAll(this.tabSelector));

    for (let i = 0; i < this.tabs.length; i += 1) {
      const tab = this.tabs[i] as HTMLElement;
      if (!tab) continue;

      const tabpanel = this.el.querySelector(
        '#' + tab.getAttribute('aria-controls'),
      );
      if (!tabpanel) continue;

      tab.tabIndex = -1;
      tab.setAttribute('aria-selected', 'false');
      this.tabpanels.push(tabpanel);

      tab.addEventListener('keydown', this.onKeydown.bind(this));
      tab.addEventListener('click', this.onClick.bind(this));

      if (!this.firstTab) {
        this.firstTab = tab;
      }
      this.lastTab = tab;
    }

    if (this.firstTab) this.setSelectedTab(this.firstTab, false);
  };

  setSelectedTab(currentTab: HTMLElement, setFocus: boolean = true) {
    for (let i = 0; i < this.tabs.length; i += 1) {
      const tab = this.tabs[i];
      if (currentTab === tab) {
        tab.setAttribute('aria-selected', 'true');
        tab.removeAttribute('tabindex');
        this.emit('selected', this.tabpanels[i]);
        this.tabpanels[i].classList.remove(this.hiddenClass);
        window.requestAnimationFrame(() => {
          this.tabpanels[i].classList.remove(this.hidingClass);
        });
        if (setFocus) {
          tab.focus();
        }
      } else {
        tab.setAttribute('aria-selected', 'false');
        tab.tabIndex = -1;
        this.tabpanels[i].classList.add(this.hidingClass);
        this.tabpanels[i].classList.add(this.hiddenClass);
      }
    }
  }

  setSelectedToPreviousTab(currentTab: HTMLElement) {
    let index;

    if (currentTab === this.firstTab) {
      if (this.lastTab) this.setSelectedTab(this.lastTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index - 1]);
    }
  }

  setSelectedToNextTab(currentTab: HTMLElement) {
    let index;

    if (currentTab === this.lastTab) {
      if (this.firstTab) this.setSelectedTab(this.firstTab);
    } else {
      index = this.tabs.indexOf(currentTab);
      this.setSelectedTab(this.tabs[index + 1]);
    }
  }

  /* EVENT HANDLERS */

  onKeydown(event: KeyboardEvent) {
    const target = event.currentTarget;
    let flag = false;

    switch (event.key) {
      case 'ArrowLeft':
        this.setSelectedToPreviousTab(target as HTMLElement);
        flag = true;
        break;

      case 'ArrowRight':
        this.setSelectedToNextTab(target as HTMLElement);
        flag = true;
        break;

      case 'Home':
        if (this.firstTab) this.setSelectedTab(this.firstTab);
        flag = true;
        break;

      case 'End':
        if (this.lastTab) this.setSelectedTab(this.lastTab);
        flag = true;
        break;

      default:
        break;
    }

    if (flag) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  onClick(event: MouseEvent) {
    this.setSelectedTab(event.currentTarget as HTMLElement);
  }

  cleanup = () => {};
}
