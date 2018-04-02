<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body, #app, .homepage {
  margin: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

h1, h2, h3, h4, h5, h6 {
  text-align: center;
  margin-top: 1.3rem;
  margin-bottom: 0.6rem;
}

a {
  text-decoration: none;
  color: black;
}

a, a:active, a:focus,
button, button:active, button:focus,
input[type="button"]:focus {
  outline: none;
}
input[type="button"]::-moz-focus-inner,
button::-moz-focus-inner {
   border: 0;
}

.hidden {
  display: none;
}

.container {
	text-align: center;
	max-width: 1200px;
	width: 100%;
	margin-left: auto;
	margin-right: auto;
}
.container.collection-edit {
  max-width: 400px;
}

.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
}

.nowrap {
  white-space: nowrap;
}

.pointer {
  /* To  not  select  text  on  double-click */
  cursor: pointer;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}

/* ***********************  BUTTONS ********************************* */

.btn {
  color: #fff;
  border: none;
  padding: .5em 1.0em .5em;
  margin: 5px;
  font: inherit;
  cursor: pointer;
  outline: 0;
  display: inline-block;
  border-radius: 1em/50%;
  transition: background-color 0.1s;
}

.btn-delete {
  color: #000;
  background-color: transparent;
  border: 1px solid rgba(255, 77, 77, 0.3)

}
.btn-delete:hover, .btn-delete:active {
  color: #fff;
  background-color: #ff4d4d;
}

.btn-add, .btn-add:hover, .btn-add:active {
  background-color: #7db85e;
}

.btn-save {
  background-color: #2185d0;
}

.btn-save:hover {
  background-color:  #1678c2;
}

.btn-save:active {
  background-color:  #1a69a4;
}

/* ********************* EASY MARGINS AND PADDINGS *************** */

.mb-2 {
  margin-bottom: 2rem;
}

/* *************************  AUTHENTICATION FORMS   *************** */

.auth-form {
  display: flex;
  flex-direction: column;
  max-width: 200px;
  margin: 0 auto;
}

.auth-form input{
  margin-bottom: 20px;
  text-align: center;
}

/* **************************  DASHBOARD ************************* */

.dashboard {
  padding: 0 3%;
  min-height: 400px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
@media (min-width: 360px) {
  .dashboard {
    padding: 0 5%;
  }
}
@media (min-width: 720px) {
  .dashboard {
    padding: 0 10%;
  }
}

.deck {
  display: table;
  width: 140px;
  height: 200px;
  margin: 0 15px 40px 15px;
  background: rgb(240, 240, 240);
  border-radius: 10px;
  box-shadow: 2px 5px 0px rgb(200, 200, 200),
    4px 10px 0px rgb(180, 180, 180),
    12px 15px 10px rgba(0, 0, 0, 0.2);
}

@media (min-width: 360px) {
  .deck {
    margin: 0 20px 50px 20px;
  }
}
@media (min-width: 720px) {
  .deck {
    margin: 0 30px 70px 30px;
  }
}

.deck a {
  display: table-cell;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  padding: 0.4rem;
  text-align: center;
  font-size: 1.4rem;
  font-weight: bold;
}

/* ************************   EDITOR  ****************************** */

.error {
  border: 1px solid red;
	border-radius: 3px;
}
.editable {
	cursor: text;
}
.card {
	padding: 0.5rem;
}
.card * {
	margin: 0;
	height: 2em;
	line-height: 2em;
}
.card button {
	padding: 0 1rem;
}
.qa {
	display: inline-block;
	float: left;
	width: 150px;
	margin-right: 1rem;
}
.qa p {
	text-align: left;
}
.qa * {
	width: inherit;
	padding: 0 0.5rem;
}
.title {
	width: 100%;
	padding: 2rem 0.5rem;
}
.title * {
	width: inherit;
}
.title-label {
	font-size: 1em;
	line-height: 1em;
	height: 1em;
	display: block;
	text-align: left;
}
.title input, .title p {
	display: block;
	margin: 0;
	font-size: 1.8rem;
	text-align: center;
}
.collection-edit input {
	font-family: inherit;
	color: inherit;
	height: inherit;
}

/* ************************   CARD ****************************** */
.cards-container{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  max-width: 2000px;
  margin: 0 auto;
  padding: 3vh;
}

/* **** just  styling * ***** */

.flip-container {
  position: relative;
  margin: 15px;
}

.flip-container, .front, .back {
  border-radius: 20px;
  width: 200px;
  height: 16rem;
  line-height: 2rem;
}

.front, .back {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  text-align: center;
  margin: auto;

  border: none;
  box-shadow: 2px 2px 15px rgb(140, 140, 140);

  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}

.front {
  background-color: #f1f7fa;
  font-size: 1.75rem;
  font-weight: 700;
}

.back {
  background-color: #fff;
  font-size: 1.4rem;
}


/* ************ CARD ANIMATION: ************* */

/* *******  ON SIDE CHANGE *********** */
.flip-container.flip .flipper {
  transform: rotateY(180deg);
}

.flipper {
  transition: 0.3s;
  transform-style: preserve-3d;
  position: relative;
}

.front {
  transform: rotateY(0deg);
}

.back {
  transform: rotateY(180deg);
}

/* ************************** HEADER ***************************** */

header{
  height: 70px;
  background-color: #0077b3;
  color: white;
}

header .content{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 3vw;
}

header .content span{
  display: flex;
  align-items: center;
}

header a{
  color: white;
  font-size: 1.4em;
}

header img{
  height: 50px;
  margin: 10px 10px 10px 0;
}

/* *****************   NOTIFICATIONS ******************************* */

.notifications-container {
  width: 100%;
  position: absolute;
  text-align: center;
}
.notifications-container--sticky {
  position: fixed;
  top: 0px;
}
.notif {
  z-index: 300;
  position: relative;
  padding: .75rem 1.25rem;
  margin: 1rem 1rem 0 1rem;
  border-radius: .25rem;
  border: 1px solid transparent;
  opacity: 0.97;
}
.notif-err {
  background-color: #f8d7da;
  border-color: #f5c6cb;
}
.notif-succ {
  background-color: #d4edda;
  border-color: #c3e6cb;
}

/* *****************   NAVIGATION ******************************* */
nav {
  text-align: center;
  margin-bottom: 40px;
  list-style: none;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
}

nav li {
  white-space: nowrap;
  font-size: 1.2rem;
}

nav a {
  display: block;
  padding: 0.5rem 0;
}

nav li.router-link-exact-active a {
  background: #f1f7fa;
}

@media (min-width: 360px) {
  nav {
    width: 100%;
    border-top: none;
    display: flex;
    justify-content: center;
  }
  nav li, nav li > a {
    display: block;
    float: left;
  }
  nav li {
    margin-bottom: -1px;
  }
  nav li > a {
    margin-right: 2px;
    line-height: 1.4rem;
    border: 1px solid transparent;
    border-radius: 4px 4px 0 0;
    padding: 0.6rem 1rem;
  }
  nav li.router-link-exact-active > a {
    color: #0077b3;
    cursor: default;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-color: transparent;
  }
}

/* ************************** FOOTER ***************************** */

footer {
  display: flex;
  justify-content: center;
  height: 3rem;
  line-height: 3rem;
  width: 100%;
  background: #ddd;
  margin: auto auto 0 0;
}

footer .content {
  margin: 0 3vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

footer .version {
  display: none;
}

@media (min-width: 480px) {
  footer {
    justify-content: space-between;
  }

  footer .version {
   display: block;
  }
}
</style>
