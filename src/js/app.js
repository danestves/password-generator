// Dependencies
import tippy from 'tippy.js'
import 'tippy.js/dist/tippy.css'
import 'tippy.js/animations/scale.css'
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'
import i18next from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

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
 * Limit numbers to max 300 in length
 */
function handleChangeLength(e) {
  let charCode = e.which ? e.which : e.keyCode

  if (
    //0~9
    (charCode >= 48 && charCode <= 57) ||
    //number pad 0~9
    (charCode >= 96 && charCode <= 105) ||
    //backspace
    charCode == 8 ||
    //tab
    charCode == 9 ||
    //enter
    charCode == 13 ||
    //left, right, delete..
    (charCode >= 35 && charCode <= 46)
  ) {
    //make sure the new value below 20
    if (parseInt(this.value + String.fromCharCode(charCode), 10) <= 300)
      return true
  }

  e.preventDefault()
  e.stopPropagation()

  return false
}
LENGTH_ELEMENT.addEventListener('keypress', handleChangeLength, false)

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

/**
 * Language switcher
 */
i18next.use(LanguageDetector).init(
  {
    fallbackLng: 'en',
    debug: true,
    resources: {
      en: {
        translation: {
          title: 'Password Generator | Made with TailwindCSS',
          description:
            'Website made to generate strong password based on user settings, looking to improve the web with better and strong passwords. Made with TailwindCSS and Heroicons.',
          language: 'en_US',
          placeholder: 'Your password will be here',
          length: 'Password length',
          uppercase: 'Include uppercase letters',
          lowercase: 'Include lowercase letters',
          numbers: 'Include numbers',
          symbols: 'Include symbols',
          button: 'Generate password',
          copyright: `Made with <span style="color: #e25555;">&#9829;</span> by
          <a
            class="underline"
            href="https://twitter.com/danestves"
            target="_blank"
            rel="noopener noreferrer"
            >@danestves</a
          >`
        }
      },
      es: {
        translation: {
          title: 'Password Generator | Hecho con TailwindCSS',
          description:
            'Sitio web creado para generar contraseñas seguras basadas en la configuración del usuario, buscando mejorar la web con contraseñas mejores y más seguras. Hecho con TailwindCSS y Heroicons.',
          language: 'es_ES',
          placeholder: 'Tu contraseña irá aquí',
          length: 'Longitud de la contraseña',
          uppercase: 'Incluir mayúsculas',
          lowercase: 'Incluir minúsculas',
          numbers: 'Incluir números',
          symbols: 'Incluir símbolos',
          button: 'Generar contraseña',
          copyright: `Hecho con <span style="color: #e25555;">&#9829;</span> por
          <a
            class="underline"
            href="https://twitter.com/danestves"
            target="_blank"
            rel="noopener noreferrer"
            >@danestves</a
          >`
        }
      }
    }
  },
  function(err, t) {
    // Head elements
    document.querySelector('title').innerHTML = i18next.t('title')
    document.querySelector('meta[name="description"]').content = i18next.t(
      'description'
    )
    document.querySelector('meta[itemprop="name"]').content = i18next.t('title')
    document.querySelector('meta[itemprop="description"]').content = i18next.t(
      'description'
    )
    document.querySelector('meta[name="twitter:title"]').content = i18next.t(
      'title'
    )
    document.querySelector(
      'meta[name="twitter:description"]'
    ).content = i18next.t('description')
    document.querySelector('meta[name="og:title"]').content = i18next.t('title')
    document.querySelector('meta[name="og:description"]').content = i18next.t(
      'description'
    )
    document.querySelector('meta[name="og:site_name"]').content = i18next.t(
      'title'
    )
    document.querySelector('meta[name="og:locale"]').content = i18next.t(
      'language'
    )

    // HTML elements
    document.getElementById('result').innerHTML = i18next.t('placeholder')
    document.getElementById('lengthLabel').innerHTML = i18next.t('length')
    document.getElementById('uppercaseLabel').innerHTML = i18next.t('uppercase')
    document.getElementById('lowercaseLabel').innerHTML = i18next.t('lowercase')
    document.getElementById('numbersLabel').innerHTML = i18next.t('numbers')
    document.getElementById('symbolsLabel').innerHTML = i18next.t('symbols')
    document.getElementById('generate').innerHTML = `${i18next.t(
      'button'
    )}<span class="sr-only">${i18next.t('button')}</span>`
    document.getElementById('copyright').innerHTML = i18next.t('copyright')
  }
)

const LANGUAGE_SWITCHER = document.querySelector('#languageSwitcher')
const ENGLISH_BUTTON = document.querySelector('#english')
const SPANISH_BUTTON = document.querySelector('#spanish')

ENGLISH_BUTTON.addEventListener('click', e => {
  e.preventDefault()

  localStorage.setItem('i18nextLng', 'en')
  window.location.reload()
})

SPANISH_BUTTON.addEventListener('click', e => {
  e.preventDefault()

  localStorage.setItem('i18nextLng', 'es')
  window.location.reload()
})

if (localStorage.getItem('i18nextLng') === 'en') {
  LANGUAGE_SWITCHER.innerHTML = `<span class="w-8 h-5 mr-2 flag-icon flag-icon-us"></span> English`
} else if (
  localStorage.getItem('i18nextLng') === 'es' ||
  localStorage.getItem('i18nextLng') === 'es-ES'
) {
  LANGUAGE_SWITCHER.innerHTML = `<span class="w-8 h-5 mr-2 flag-icon flag-icon-es"></span> Español`
}
