// Dependencies
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'

/**
 * Init tippy
 */
tippy('[data-tippy-content]', {
  animation: 'scale'
})

/**
 * Hot module
 */
if (module.hot) {
  module.hot.accept()
}

/**
 * Generator functions - http://www.net-comber.com/charset.html
 */
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

/**
 * Init functions
 */
const RANDOM_FUNCTION = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol
}

/**
 * DOM elements
 */
const RESULT_ELEMENT = document.getElementById('result')
const LENGTH_ELEMENT = document.getElementById('length')
const UPPERCASE_ELEMENT = document.getElementById('uppercase')
const LOWERCASE_ELEMENT = document.getElementById('lowercase')
const NUMBERS_ELEMENT = document.getElementById('numbers')
const SYMBOLS_ELEMENT = document.getElementById('symbols')
const GENERATE_ELEMENT = document.getElementById('generate')
const CLIPBOARD_ELEMENT = document.getElementById('clipboard')

/**
 * Generate password
 *
 * @param {Number} length
 * @param {Boolean} upper
 * @param {Boolean} lower
 * @param {Boolean} number
 * @param {Boolean} symbol
 */
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

/**
 * Event listeners
 */
GENERATE_ELEMENT.addEventListener('click', () => {
  const LENGTH = +LENGTH_ELEMENT.value
  const HAS_UPPER = UPPERCASE_ELEMENT.checked
  const HAS_LOWER = LOWERCASE_ELEMENT.checked
  const HAS_NUMBER = NUMBERS_ELEMENT.checked
  const HAS_SYMBOL = SYMBOLS_ELEMENT.checked

  RESULT_ELEMENT.innerText = generatePassword(
    LENGTH,
    HAS_UPPER,
    HAS_LOWER,
    HAS_NUMBER,
    HAS_SYMBOL
  )
})

/**
 * Copy password to clipboard
 */
CLIPBOARD_ELEMENT.addEventListener('click', () => {
  const TEXTAREA = document.createElement('textarea')
  const PASSWORD = RESULT_ELEMENT.innerText

  if (PASSWORD === 'Your password will be here') {
    return
  }

  TEXTAREA.value = PASSWORD
  document.body.appendChild(TEXTAREA)
  TEXTAREA.select()
  document.execCommand('copy')
  TEXTAREA.remove()
  Toastify({
    text: 'Password copied to clipboard <span class="mx-2">🚀</span>',
    duration: 5000,
    close: true,
    gravity: 'top',
    position: 'right',
    backgroundColor: '#48bb78',
    className: 'text-lg',
    stopOnFocus: true // Prevents dismissing of toast on hover
  }).showToast()
})

/**
 * Dark mode
 */
const BODY = document.getElementsByTagName('html')[0]
const DARKMODE_TOGGLE = document.querySelector('#darkmode-toggle')

DARKMODE_TOGGLE.addEventListener('click', () => {
  BODY.classList.toggle('dark-mode')

  if (BODY.classList.contains('dark-mode')) {
    localStorage.setItem('darkMode', 'true')
  } else {
    localStorage.setItem('darkMode', 'false')
  }
})

if (localStorage.getItem('darkMode') === 'true') {
  BODY.classList.add('dark-mode')
  DARKMODE_TOGGLE.checked = true
} else {
  BODY.classList.remove('dark-mode')
  DARKMODE_TOGGLE.checked = false
}
