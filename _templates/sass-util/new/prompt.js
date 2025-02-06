// see types of prompts:
// https://github.com/enquirer/enquirer/tree/master/examples
//
module.exports = [
  {
    type: 'input',
    name: 'name',
    message: 'What should this include be called?',
    default: 'my-new-util',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Briefly describe this include.',
  },
];
