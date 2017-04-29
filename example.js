/* the env variable */
env = {
  rawInput: 'string', /* the exact code that was entered */
  findElement: 'function', /* locate an element with a selector */

}

/* the rules variable */
const rules = {
  'min-tags': [
    /* */ true,
    function (env, options) {

    },
    /* default */ ''
  ],
  ''
}


const feedback = {
  'rule-1': false, /* turn off 'rule-1' */
  'rule-2': true, /* turn on 'rule-1' */
  'rule-3': "don't do that", /* turn on 'rule-3', and set the feedback to "don't do that" */
  'rule-4':
  'min-tags': {
    enabled: true,
  }
}
