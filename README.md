[![Waffle.io - Columns and their card count](https://badge.waffle.io/chingu-voyage4/Bears-Team-15.svg?columns=all)](http://waffle.io/chingu-voyage4/Bears-Team-15)


Check out current demo version: **[https://cards-bears-15.herokuapp.com](https://cards-bears-15.herokuapp.com)**

### Our project

In this voyage we are aiming to create a Flashcards application.

According to [Wikipedia](https://en.wikipedia.org/wiki/Flashcard), flashcards are
> cards bearing information, as words or numbers, on either or both sides, used in study. One writes a question on a side and an answer overleaf.
>
> Flashcards can bear vocabulary, historical dates, formulae or any subject matter that can be learned via a question-and-answer format. Flashcards are widely used to aid memorization.

Get more info about this project on the [wiki page](https://github.com/chingu-voyage4/Bears-Team-15/wiki).

### About us

We are the **Bears-Team-15** from  [Chingu Voyage-4](https://github.com/chingu-voyage4).

[Chingu](https://chingu.io/) cohorts is the best place for self learning web enthusiasts – to learn together, collaborate and work on real projects in remote teams.

#### Our team

[Anton Tymczenko](https://github.com/AntonTymczenko) – project manager

[Svetlana](https://github.com/svmi3195) – team member

[Tomek Straszewski](https://github.com/tomski80) – team member

### Build Setup

``` bash
# install dependencies
npm install

# serve client side with hot reload at localhost:8080
npm run dev:client

# run back-end with hot reload at localhost:8081
# Attention! You'll need to configure `.env` file. Details are below.
npm run dev:server

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

To run back-end server locally you'll need to create a `.env` file in project's root directory. Example of `.env` file:

```
PORT=8081
MONGODB_URI="mongodb://localhost:27017/cards"
JWT_SECRET=someSuperSecret
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### Contribution guidelines

See our [contribution guidelines](CONTRIBUTING.md)
