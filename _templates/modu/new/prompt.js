// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What should this module be called?',
    default: 'MyModule',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Briefly describe this module.',
  },
];
