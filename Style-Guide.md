# Style guide

This is Bears-15 team’s style guide on naming branches, writing commit messages
and general code style.

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

As body and footer are optional, your commit message should at least have a type
and a subject.

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

Subjects should begin with a capital letter and not end with a period.


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
Are there side effects or other unintuitive consequenses of this
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

## Git workflow, branches

###### Additional resources:
* [link](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow)
* [link](https://github.com/ollyjohn/turtles-nineteen/wiki/Git-Workflow)

