# Introduction

**TLDR:** *This API assists in auto-grading code exercises*

The most effective learning makes use of instruction *and* evaluation. Instruction is fairly straight-forward. And in many cases, so is evaluation. Multiple choice questions can enhance learning, but the best evaluation for programing is *code exercises*, where the student writes their own code to complete a goal. Ideally, these *code exercises* can be graded automatically. Maybe a human is needed to setup the grading, by creating rules for what the code should look like. However, there are a few issues with automatically grading code.

Most programing languages are designed to be written correctly. That is, most compilers or interpreters don't handle certain mistakes well. Forget a single character, or misplace a token, and the resulting errors can be unintelligible to a beginner. Beginners benefit from careful guidance, but at the same time, compilers/interpreters shouldn't have to concern themselves with the mistakes that a beginner could make. An instructor or teacher could provide such guidance, but reading lines upon lines of microscopic mistakes is exhausting. The next best option is to make a computer read the code, and provide guidance.

The concept is simple, but the implementation may not be; we must create code that reads code, points out common mistakes, and verifies that the goal was achieved. Furthermore, the 'goal' cannot be hard-coded; it will be different for each exercise. So this system should also allow the goal to be specified, and allow helpful feedback to be provided which guides the student toward the goal.

Version 1.0 is targeted at HTML and CSS. Exercise 'rules' are written in JavaScript.

# The Code Review Designer API

## Overview

The designer creates 'rules', which preform checks on submitted code, then return a pass or fail result. The `codeReview` Object provides access to this API.

## In depth

1. [Rules](rules.md)
  1. [The `env` object](env.md)
1. [Assert](assert.md)
1. [Feedback API](feedback.md)
