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
const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

// Event listeners
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value
  const hasUpper = uppercaseEl.checked
  const hasLower = lowercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked
})
