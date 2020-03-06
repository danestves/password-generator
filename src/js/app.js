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
const getRandomLower = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

const getRandomUpper = () => {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

const getRandomNumber = () => {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const getRandomSymbol = () => {
  const symbols = '!@#$%^&*(){}[]=<>/,.'

  return symbols[Math.floor(Math.random() * symbols.length)]
}

// Init functions
const RANDOM_FUNCTION = {
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

  resultEl.innerText = generatePassword(
    length,
    hasUpper,
    hasLower,
    hasNumber,
    hasSymbol
  )
})

// Generate password
const generatePassword = (length, upper, lower, number, symbol) => {
  // Init pw var
  let GENERATED_PASSWORD = ''
  const TYPES_COUNT = upper + lower + number + symbol

  // Filter out unchecked types
  const TYPES_ARRAY = [{ upper }, { lower }, { number }, { symbol }].filter(
    item => Object.values(item)[0]
  )

  // Loop over length call generator function for each type
  if (TYPES_COUNT === 0) {
    return ''
  }

  for (let i = 0; i < length; i += TYPES_COUNT) {
    TYPES_ARRAY.forEach(type => {
      const FUNCTION_NAME = Object.keys(type)[0]

      GENERATED_PASSWORD += RANDOM_FUNCTION[FUNCTION_NAME]()
    })
  }

  // Add final pw to the pw var and return
  const FINAL_PASSWORD = GENERATED_PASSWORD.slice(0, length)

  return FINAL_PASSWORD
}

// Copy password to clipboard
