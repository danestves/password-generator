// Dependencies
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'

// Init tippy
tippy('[data-tippy-content]')

// Hot module
if (module.hot) {
  module.hot.accept()
}

// Generator functions - http://www.net-comber.com/charset.html
getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

getRandomNumber = () => {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.'

  return symbols[Math.floor(Math.random() * symbols.length)]
}

// Init functions
const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

// DOM elements
