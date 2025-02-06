import { Modu } from '@malven/modu';
import type { ModuOptions } from '@malven/modu';
import A11yDialog from 'a11y-dialog';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

/**
 * Generic dialog module.
 *
 * Uses https://a11y-dialog.netlify.app
 */

export default class extends Modu {
  closeDelay = 400;
  isOpen = false;
  dialog!: A11yDialog;
  isClosedByOthers: boolean;

  constructor(m: ModuOptions) {
    super(m);

    this.closeDelay = this.getData('close-delay')
      ? Number(this.getData('close-delay'))
      : this.closeDelay;

    // Should this dialog trigger others to close?
    this.isClosedByOthers = (this.getData('closed-by-others') ??
      true) as boolean;
  }

  init() {
    this.dialog = new A11yDialog(this.el as HTMLElement);

    // Hide when a11y-dialog hides
    this.dialog.on('hide', () => this.close());

    // Show when a11y-dialog shows
    this.dialog.on('show', () => this.open());

    // Listen for other dialogs to open and close this one
    this.on('Dialog', 'open', () => {
      if (this.isClosedByOthers) this.close();
    });
  }

  open() {
    this.dialog.show();
    this.showDialog();
    this.emit('open', this.el);
  }

  close() {
    this.dialog.hide();
    this.hideDialog();
  }

  showDialog = () => {
    this.el.classList.add('is-opening');
    this.isOpen = true;
    window.requestAnimationFrame(() => {
      this.el.classList.add('is-open');
    });
    disableBodyScroll(this.el, { reserveScrollBarGap: true });
    this.call('DialogToggle', 'set', true, this.key);
    this.el.scrollTop = 0;
  };

  hideDialog = () => {
    this.el.classList.remove('is-open');
    this.isOpen = false;
    window.setTimeout(() => {
      if (this.isOpen) return;
      enableBodyScroll(this.el);
      this.el.classList.remove('is-opening');
    }, this.closeDelay);
    this.call('DialogToggle', 'set', false, this.key);
  };

  cleanup = () => {
    // Body scroll lock
    enableBodyScroll(this.el);

    // Destroy dialog
    this.dialog.destroy();
  };
}
