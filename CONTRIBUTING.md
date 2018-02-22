# Contribution guidelines

The following is a set of guidelines for contributing to our project.

#### Table Of Contents
* [General](#general)
* [Vue](#vue)
* [JavaScript](#javascript)
* [Commit messages](#writing-commit-messages)
  * [Type](#type)
  * [Subject](#subject)
  * [Body](#body)
  * [Footer](#footer)
* [Workflow](#workflow-issues-branches-and-waffleio-integration)
  * [Defining MVP](#about-defining-mvp)
  * [Using Issues](#issue-as-a-structure-unit-in-a-developing-process)
  * [Waffle dashboard](#waffleio-columns)
  * [Issues related to features](#issue-as-a-product-of-user-stories)
  * [Issues related to tasks](#issue-as-a-representation-of-a-task)
  * [Waffle.io automation](#waffleio-automation)
  * [Naming Git branches](#naming-git-branches)

## General

Every file should contain an empty line at the end.

There should not be empty spaces at the end of the line.

These are just general conventions. So please make sure that your IDE or text
editor is configured properly to automatically add an empty line and remove all
the spaces at the end of line. It would prevent unnecessary headache for your
teammates every time they will commit changes to files created or edited by you.

## Vue

First-level child (or children) of general tags like `<template>`, `<script>`
and `<style>` should not be indented.

To save some horizontal space by reducing an amount of indentation, `data`
method of default exported object should have syntax like in example below.
Besides, it looks sassy and hip ;D

###### Example:

```
<template>
<div class="bourgeoisie">
  <p>I'm the second-level child, so I'm indented</p>
</div>
</template>

<script>
import Bananas from '../bananaRepublic/Bananas.vue'

export default {
  // export is not indented either
  data: () => ({
    key: 'value'
  })
}
</script>

<style>
.bourgeoisie {
  font-family: Aristocratic;
}
</style>
```

Use two spaces for indentation in your code.

## JavaScript

For writing your JavaScript code use [AirBnB's style guide](https://github.com/airbnb/javascript).

## Writing commit messages

Commit messages should be meaningful and should explain the changes that have
been made. Good message could help a reviewer not to look inside of modified
files and save one's precious time. So please, be respectful.

Do atomic commits, thoroughly explain each of them. Don't cram everything into
one huge commit and title it "I've done this feature".

Your commit messages should consist of three distinct parts separated by
a blank line: a title, an optional body and an optional footer.

###### Perfect blessed commit message's structure:

```
type: subject

body

footer
```

As body and footer are optional, your commit message should at least have a
**title** with a type and a subject.

#### Type

There are two categories of commits. Those which affect production code and
those which don’t. First group includes next types:

**feat** – add a new feature

**fix** – fix a bug

**refactor** – do refactoring of production code

**style** – change formatting, remove superfluous `const`, fix missing commas,
closing tags etc. No actual change of logic in code.

And the second group is comprised of:

**test** – add tests, refactor test. No production code change.

**docs** – changes to documentation

**chore** – update build tasks, package manager configs etc. No production code
change.

#### Subject

In subject you should explain what you did. But not in past tense. Write
messages in imperative – just like commands. Use words like **add**, **fix**,
not **added**, **fixed** etc. Be a tiny tyrant, don't be shy.

The whole message should not exceed 72 characters. Most of contemporary IDE
which have Git integration would tell you how many characters are left for your
message while you're typing in. Just be attentive.

Subjects should begin with a capital letter and do not end with a period.


#### Body

Not all commits are complex enough to have a body, therefore it is optional and
only used when a commit requires a bit of explanation and context. Use the body
to explain the **what** and **why** of a commit, not the **how**.

When writing a body, the blank line between the title and the body is required
and you should limit the length of each line to no more than 72 characters.

#### Footer

The footer is optional and is used to reference issue tracker IDs, tags,
milestones etc.

###### Perfect blessed commit message:

```
feat: Summarize changes in around 50 characters or less

More detailed explanatory text, if necessary. Wrap it to about 72
characters or so. In some contexts, the first line is treated as the
subject of the commit and the rest of the text as the body. The
blank line separating the summary from the body is critical (unless
you omit the body entirely); various tools like `log`, `shortlog`
and `rebase` can get confused if you run the two together.

Explain the problem that this commit is solving. Focus on why you
are making this change as opposed to how (the code explains that).
Are there side effects or other unintuitive consequences of this
change? Here's the place to explain them.

Further paragraphs come after blank lines.

 - Bullet points are okay, too

 - Typically a hyphen or asterisk is used for the bullet, preceded
   by a single space, with blank lines in between, but conventions
   vary here

If you use an issue tracker, put references to them at the bottom,
like this:

See also #456, #789
Resolves #123
```

###### Additional resources:
[Udacity Git commit message style guide](https://udacity.github.io/git-styleguide/)

## Workflow: issues, branches and Waffle.io integration

In general our workflow could be divided into following steps.

1. Brainstorming in Discord and Google Docs
2. Defining user stories, tasks and MVP for the next sprint
3. Adding issues to GitHub via Waffle.io
4. Assigning contributors to resolve particular issues
5. Contributing code
6. Reviewing and merging
7. Deploying MVP

#### About defining MVP

Our team believes that in Scrum methodology the scope of a project is
an estimated thing. So we could not predict how shiny would be our application
at the end of Chingu's Voyage-4. But we can define the amount of work to be
done in the next sprint, so at the end of each iteration a user could actually
use our product. And the product would be better compared to a previous version.

#### Issue as a structure unit in a developing process

GitHub is a great platform for software developers. And one of its features
which our team uses as a main structuring element is **Issue**. By opening
an issue one can request some enhancement in UI/UX or report about some bugs.
So despite negative semantics of a word "issue", it is both about good
and bad sides of user's experience.

#### Waffle.io columns

We use Waffle.io for issue management.
By default all newly opened issues go to **Inbox** column. It is unordered list
of all unsorted, uncategorized and unassigned issues. Just like your mail's
inbox.

When issues are categorized and prioritized, they go to **Backlog** column. The
most important issues are on top.

Next two columns represent Sprints: **Next** and **Current**. So in this way,
tasks in each of these columns have their due dates.

When a contributor starts working on an issue, it should be moved to
**In Progress** column. It will happen automatically if a contributor would
follow instructions mentioned below in [Waffle.io automation](#waffleio-automation)
section of this guide.

After a Pull Request (PR) solving particular issue was made, an issue moves to
**Review** column.

When a PR was successfully merged into default branch, it moves to **Done**.

#### Issue as a product of user stories

When there is a feature in a scope of a particular sprint,
which fulfills several user stories,
this feature creates an issue with
a title in format `feat: few words of description`.
And the stories should be listed in the description block of the issue.

#### Issue as a representation of a task


All tasks related to stories mentioned in a previous paragraph
should be represented as individual issues. Each of them should contain
`connected to #N` at the end of their description. Where `N` is an ID
of "parent" (or "feature") issue – to which the tasks belong. If everything
is set properly, Waffle should group all the tasks issues under the feature
issue. So it makes the navigation much easier.

#### Waffle.io automation

* add an issue, look at the number on the card (let's consider it `33`)
* make a branch with a number of an issue at the end of name:
	`docs-license-#33`
* push a branch to origin. It would move an issue to **In Progress**
* do commits, push from time to time
* when everything is done – test it and push to remote
* make a pull request at GitHub,
   add `closes #33` at the end of description (or title, if it is short enough).
   It will move an issue to **Review**
* merge a PR and it will move to **Done**
   (works only for merging into default branch)


#### Naming Git branches

We use this general rule in naming our Git branches. Name of a branch consists
of type, description and ID of an issue which this branch is going to solve.
Types are the same as in commit messages (see above).

###### Examples:
```
docs-license-#33
feat-homepage-#18
chore-boilerplate-#2
fix-typo-in-footer-component-#32
```

If a branch you are going to work on is about solving a task, which is
"connected to" another feature-related issue, then you should find a branch
with an ID of that feature. If it doesn't exist, create it using conventions
mentioned in previous paragraph. Then create your new branch starting with
a name of a "parent" branch by adding description and ID of your current task.

###### Example:

> There is a feature-related issue `feat: homepage` with ID of `18`. And the
branch `feat-homepage-#18` is in the repo.
>
> Your task is to create a Footer component. The ID of an issue with this task
is `12`. Then your new branch should be named `feat-homepage-#18-footer-#12`.
This way you will not forget where to merge your current branch – into
`feat-homepage-#18`. And also it simplifies navigation between the branches.

This approach is good when there are other issues which are connected to
`feat: homepage` and they are assigned to other contributors. But if you are
the only one who contributes to this particular feature – you don't need to make
child branches. You can just push your code to the main branch
`feat-homepage-#18`

Creating branches which aggregate other smaller branches would help to make
developing process faster. If you depend on contributions of other developers
to be done before making your next steps in building a feature, you won't have
to wait until your or their PR to protected `development` branch would be
reviewed and approved. Now you can pull main `feat-homepage-#18` branch from
time to time and see if other contributors had pushed something into it.
So then you merge their changes into your branch and move on until the work
on your `feat-homepage-#18-footer-#12` is done. Then you merge it into the
main branch and push that main branch to remote. When all the tasks are
completed and the whole feature is tested, now it is time for
`feat-homepage-#18` to go to `development` as a complete unit via PR.


###### Additional resources:
* [Git Feature Branch Workflow | Atlassian](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
* [Git workflow | Chingu Voyage-2 Turtles-19](https://github.com/ollyjohn/turtles-nineteen/wiki/Git-Workflow)
* [Waffle.io FAQ](https://help.waffle.io/faq)
* [Waffle.io guide on using automatic work tracking](https://help.waffle.io/automatic-work-tracking/auto-work-tracking-basics/recommended-workflow-using-pull-requests-automatic-work-tracking)
* [Git Branch Naming Conventions | Andrew Allen](https://allenan.com/git-branch-naming-conventions/)
