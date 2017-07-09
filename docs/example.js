/* Ouside the exercise */

// Define a new assertion rule
rule.new({
    name: 'valid-doctype',
    feedback: "You're missing a `doctype` tag! You should always include a doctype declaration",
    check: env =>
        env.doctype == 'HTML5'
})

rule.new({
    name: 'basic-structure',
    feedback: "You're missing {{ an_some }} important {{ word }}: {{ list }}",
    options: {
        checkFor: ['body', 'html', 'head']
    },
    check: (env, options) => {
        const checkFor = options.checkFor
        
        const missingElements = checkFor.filter(tagName => {
            return !env[tagName]
        })
        
        return { // Returning an object means "This failed" and "Use this object to template the feedback"
            list: missingElements, 
            word: 'element'
        }
    }
})
rule.alias('has-body-tag', 'basic-structure', {checkFor: ['body']})



/* In an exercise's assertion code */

// Check a few pre-defined rules
codeReview
    .assert('valid-doctype')
    .and('basic-structure', {checkFor: ['body']}) // .and runs the check, even if the preceeding rule fails
    // Instead of 'basic-structure', the alias 'has-body-tag' could have been used instead
    
    // .then only runs a check if the preceeding rule passes
    .then(env => { // Instead of a rule name, just pass a function, since we only use this in one exercise
        const formCount = env.elements('form').count
        const result = formCount == 1 || 'You should have 1 form, but you have ' + formCount
        
        return result // Returning 'true' means "This passed", a string means "this failed" and the string is used as feedback
    })
    .then(env => {
        env.element('div').style('background-image') // cascaded background style (but not computed)
        
        env.getStylesheets() // -> [stylesheet1, stylesheet2]
        env.getStylesheets('internal') // or 'external'
            .rules() // -> {div: {background-image: URL}}
            
        env.element('div').styles('background-image')
        // -> ['blue', CSSStyleValue]
        
        CSSStyleValue.rgba() // -> rgba(0,0,0,0)
        
        env.styles()
        // -> 
    })
    
    
/*  env.feedbacker(template, number, )
        This is the function that templates the feedback. It may be used in by a rule to construct custom feedback.
    
    env.element()
    env.elements()
*/
