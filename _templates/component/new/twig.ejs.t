---
to: <%= h.getDestinationForType(h.changeCase.paramCase(name), type, 'twig') %>
---
<%_ const title = h.changeCase.title(name) _%>
<%_ const slug = h.formatSlug(h.changeCase.paramCase(name), type) _%>
{# =============================================================== #}
{# <%= h.getTitlePrefixForType(type) %><%= title %>
{# =============================================================== #}
<%_ if (type === 'Twig Include') { _%>
{#
  {% include '_partials/<%= slug %>' with {

  } only %}
#}
<%_ } _%>
<%_ if (type === 'Twig Embed') { _%>
{#
  {% embed '_embeds/<%= slug %>' %}
    {% block main %}
      …
    {% endblock %}
  {% endembed %}
#}
<%_ } _%>
<%- h.emmet(slug, rootElement, emmet) %>
