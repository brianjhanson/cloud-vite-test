const expand = require('emmet').default;

const getClassListFromMarkup = (markup) => {
  // Get all unique css classes in html into dict
  const classRegexp = /class=['"](.*?)['"]/g;
  let dict = [];
  let m;
  while ((m = classRegexp.exec(markup))) {
    let classes = m[1].replace(/\s+/g, ' ').trim();
    classes.split(' ').forEach(function (item) {
      dict[item] = true;
    });
  }

  // convert dict to arr
  let arr = [];
  for (let key in dict) arr.push(key);

  return arr;
};

const getEmmetMarkup = (filename, rootElement, emmetString) => {
  const emmet = `${rootElement}.${filename}>${emmetString}`;
  let markup = expand(emmet, {
    options: {
      inlineElements: [],
      'bem.enabled': true,
      'bem.element': '__',
      'bem.modifier': '--',
      'output.indent': '  ',
      'comment.enabled': true,
      'comment.after': '',
      'comment.before': '{# Object - [CLASS] #}\n',
    },
  });

  // Replace the comment for the filename.
  markup = markup.replace(`{# Object - ${filename} #}`, '');

  // Loop over every child comment and if we find this pattern, replace it with the formatted version and title case it
  const pattern = new RegExp(`{# Object - ${filename}__(.*?) #}`, 'g');
  markup = markup.replace(pattern, function (match, p1) {
    return `{# ${p1
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())} #}`;
  });

  return markup;
};

const getDestinationForType = (name, type, extension) => {
  const destinations = {
    'Twig Include': {
      twig: `templates/_partials/${name}.twig`,
      scss: `src/styles/objects/_${name}.scss`,
    },
    'Twig Embed': {
      twig: `templates/_embeds/l-${name}.twig`,
      scss: `src/styles/layout/_l-${name}.scss`,
    },
    'Twig Block': {
      twig: `templates/_partials/blocks/${name}.twig`,
      scss: `src/styles/objects/_${name}.scss`,
    },
  };

  return destinations[type][extension];
};

const getTitlePrefixForType = (type) => {
  const prefixes = {
    'Twig Include': '',
    'Twig Embed': 'Layout - ',
    'Twig Block': 'Block - ',
  };
  return prefixes[type];
};

const formatSlug = (name, type) => {
  return type === 'Twig Embed' ? `l-${name}` : name;
};

module.exports = {
  helpers: {
    emmet: (...params) => {
      return getEmmetMarkup(...params);
    },
    getEmmetClassList: (...params) => {
      const markup = getEmmetMarkup(...params);
      return getClassListFromMarkup(markup);
    },
    getDestinationForType: (...params) => getDestinationForType(...params),
    getTitlePrefixForType: (type) => getTitlePrefixForType(type),
    formatSlug: (...params) => formatSlug(...params),
  },
};
