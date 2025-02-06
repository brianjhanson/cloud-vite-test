---
to: <%= h.getDestinationForType(h.changeCase.paramCase(name), type, 'scss') %>
---
<%_ const title = h.changeCase.title(name) _%>
<%_ const slug = h.formatSlug(h.changeCase.paramCase(name), type) _%>
/*
<%= h.getTitlePrefixForType(type) %><%= title %>
<%_ if (description.length) { %>
<%= description %>
<% } -%>
*/
<%_ h.getEmmetClassList(slug, rootElement, emmet).forEach(function(className) { _%>

.<%= className %> {

}
<%_ }) _%>
