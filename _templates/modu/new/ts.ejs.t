---
to: src/scripts/modules/<%= name %>.ts
---
import { Modu, ModuOptions } from '@malven/modu';

<%_ if (description.length) { -%>
/**
 * <%= description %>
 */
<% } -%>

export default class extends Modu {
  constructor(m: ModuOptions) {
    super(m);
  }

  init = () => {

  };

  cleanup = () => {
    // Code to run when the module is destroyed
  };
}
