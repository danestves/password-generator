# <center>Password Generator ✨</center>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![Build Status](https://travis-ci.org/danestves/password-generator.png?branch=master)](https://travis-ci.org/danestves/password-generator) [![GitHub issues](https://img.shields.io/github/issues/danestves/password-generator)](https://github.com/danestves/password-generator/issues) [![GitHub forks](https://img.shields.io/github/forks/danestves/password-generator)](https://github.com/danestves/password-generator/network) [![GitHub stars](https://img.shields.io/github/stars/danestves/password-generator)](https://github.com/danestves/password-generator/stargazers) [![GitHub license](https://img.shields.io/github/license/danestves/password-generator)](https://github.com/danestves/password-generator/blob/master/LICENSE)

This open source project is made to show my knowledge about JavaScript and Frontend Development 🤓

You can see the live project [here](https://passgenerator.dev) 🚀

# What we use? 🧐

🖥 For the CSS i use [TailwindCSS](https://tailwindcss.com), i extremely recommend you to use this utility framework; it's going to help you to optimize your development time like 10x more faster

🕹 For the animation of the dropdown i use [AlpineJS](https://github.com/alpinejs/alpine) that is a reactive and declarative library with the nature of big frameworks like Vue or React at a much lower cost

🇺🇸 For the internationalization i use [i18next](https://www.i18next.com/) that is a **framework** written in and for JavaScript to use different languages in your code

💭 For the tooltips i use [Tippy.js](https://atomiks.github.io/tippyjs/) that is a lightweight library to make tooltips and popovers more faster than you think

🔔 And for the notifications i use [Toastify JS](https://apvarun.github.io/toastify-js/) with only two lines of code you can trigger a fully customizable notification element

# How we implemented dark mode?

I use a plugin that i wrote for TailwindCSS, you can see the code and the process of installation [here](https://github.com/danestves/tailwindcss-darkmode)

After you installed the plugin, you can init here:

```js
// tailwind.config.js

module.exports = {
  // ...

  plugins: [
    // ...
    require('tailwindcss-darkmode')()
  ]
}
```

That will work when in your `<html>` tag have the class off `dark-mode`

🚨 You need to put the variants of dark mode where you want to use it 🚨

Here is an example:

```js
variants: {
   backgroundColor: [
     "responsive",
     "hover",
     "focus",
     "dark",
     "dark:hover",
     "dark:focus"
   ],
   borderColor: [
     "responsive",
     "hover",
     "focus",
     "dark",
     "dark:hover",
     "dark:focus"
   ],
   textColor: [
     "responsive",
     "hover",
     "focus",
     "group-hover",
     "dark",
     "dark:hover",
     "dark:focus",
     "dark:group-hover",
     "focus-within",
     "dark:focus-within",
     "dark:odd",
     "dark:even",
     "dark:active",
     "dark:disabled"
   ],
   borderStyle: ["responsive", "dark"]
 }
```

And latter in my `app.js` i write the following code to make use of a checkbox in my HTML and change the color scheme depending if is checked or not:

```js
/**
 * Dark mode
 */

const BODY = document.getElementsByTagName('html')[0]
const DARKMODE_TOGGLE = document.querySelector('#darkmode-toggle')
const THEME_COLOR = document.querySelector('meta[name="theme-color"]')
const THEME_COLOR_MS = document.querySelector(
  'meta[name="msapplication-TileColor"]'
)

// Listen when we make a click in the checkbox
DARKMODE_TOGGLE.addEventListener('click', () => {
  BODY.classList.toggle('dark-mode')

  if (BODY.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'true')
  } else {
    localStorage.setItem('darkMode', 'false')
  }
})

// Check if the browser has compatibility with dark mode
if (window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all') {
  if (localStorage.getItem('darkMode') !== 'false') {
    localStorage.setItem('darkMode', 'true')
    BODY.classList.add('dark-mode')
    DARKMODE_TOGGLE.checked = true
  }
}

// If the item exist in localStorage with true set the class in the HTML
if (localStorage.getItem('darkMode') === 'true') {
  BODY.classList.add('dark-mode')
  THEME_COLOR.content = '#2a4365'
  THEME_COLOR_MS.content = '#2a4365'
  DARKMODE_TOGGLE.checked = true
} else {
  BODY.classList.remove('dark-mode')
  THEME_COLOR.content = '#ffffff'
  THEME_COLOR_MS.content = '#ffffff'
  DARKMODE_TOGGLE.checked = false
}
```

And that's all! 😱 Also if you want to know how we create the functionality to generate the password, you can check in `app.js`. All the file is documented and ready to make changes if you want to improve the functionality 💪

**Let's go and help open source projects** 😎

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://danestves.com/"><img src="https://avatars0.githubusercontent.com/u/31737273?v=4" width="100px;" alt=""/><br /><sub><b>Daniel Esteves</b></sub></a><br /><a href="https://github.com/danestves/password-generator/commits?author=danestves" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!