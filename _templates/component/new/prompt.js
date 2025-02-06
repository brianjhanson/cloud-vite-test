// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'select',
    name: 'type',
    message: 'What type of component is this?',
    default: 'Twig Include',
    choices: ['Twig Include', 'Twig Embed', 'Twig Block'],
  },
  {
    type: 'input',
    name: 'name',
    message: 'What should this component be called?',
    default: 'my-new-component',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Briefly describe this component.',
  },
  {
    type: 'input',
    name: 'rootElement',
    message: 'What should the root element be?',
    default: 'div',
  },
  {
    type: 'input',
    name: 'emmet',
    message: "What is the emmet abbreviation for this component? (e.g. 'div')",
    default: '',
  },
];
