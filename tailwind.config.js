module.exports = {
  theme: {},
  variants: {
    backgroundColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark:hover',
      'dark:focus'
    ],
    borderColor: [
      'responsive',
      'hover',
      'focus',
      'dark',
      'dark:hover',
      'dark:focus'
    ],
    textColor: [
      'responsive',
      'hover',
      'focus',
      'group-hover',
      'dark',
      'dark:hover',
      'dark:focus',
      'dark:group-hover',
      'focus-within',
      'dark:focus-within',
      'dark:odd',
      'dark:even',
      'dark:active',
      'dark:disabled'
    ],
    borderStyle: ['responsive', 'dark']
  },
  plugins: [require('@danestves/tailwindcss-darkmode')()]
}
