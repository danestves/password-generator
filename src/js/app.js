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
const RESULT_ELEMENT = document.getElementById('result')
const LENGTH_ELEMENT = document.getElementById('length')
const UPPERCASE_ELEMENT = document.getElementById('uppercase')
const LOWERCASE_ELEMENT = document.getElementById('lowercase')
const NUMBERS_ELEMENT = document.getElementById('numbers')
const SYMBOLS_ELEMENT = document.getElementById('symbols')
const GENERATE_ELEMENT = document.getElementById('generate')
const CLIPBOARD_ELEMENT = document.getElementById('clipboard')

// Event listeners
GENERATE_ELEMENT.addEventListener('click', () => {
  const length = +LENGTH_ELEMENT.value
  const hasUpper = UPPERCASE_ELEMENT.checked
  const hasLower = LOWERCASE_ELEMENT.checked
  const hasNumber = NUMBERS_ELEMENT.checked
  const hasSymbol = SYMBOLS_ELEMENT.checked

  RESULT_ELEMENT.innerText = generatePassword(
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

  // UI changes to text color
  RESULT_ELEMENT.classList.remove('text-gray-500')
  RESULT_ELEMENT.classList.add('text-gray-700')

  return FINAL_PASSWORD
}

// Copy password to clipboard
CLIPBOARD_ELEMENT.addEventListener('click', () => {
  const TEXTAREA = document.createElement('textarea')
  const PASSWORD = RESULT_ELEMENT.innerText

  if (!PASSWORD) {
    return
  }

  TEXTAREA.value = PASSWORD
  document.body.appendChild(TEXTAREA)
  TEXTAREA.select()
  document.execCommand('copy')
  TEXTAREA.remove()
  alert('Password copied to clipboard!')
})
