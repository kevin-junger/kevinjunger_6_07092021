/**
 * Form
 * Used by Modal in the Profile view class
 * Checks the user's inputs in the form and handles the checks on validation
 */

export default class Form {
  constructor() {
    // DOM elements - form fields and submit button
    this.firstName = document.querySelector('.form__input[name="first"]')
    this.lastName = document.querySelector('.form__input[name="last"]')
    this.email = document.querySelector('.form__input[name="email"]')
    this.message = document.querySelector('.form__message')
    this.submit = document.querySelector('.form__submit')
    this.dialogContainer = document.querySelector('.contact__dialog')
    // Regular expressions for data validation
    this.regexAlpha = /^[a-zA-ZÀ-ÖØ-öø-ÿ- \s]+$/
    this.regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  init() {
    // add event listeners on each field to check the user's input when it loses focus
    this.firstName.addEventListener('focusout', () => {
      this.checkFirstName()
    })
    this.lastName.addEventListener('focusout', () => {
      this.checkLastName()
    })
    this.email.addEventListener('focusout', () => {
      this.checkEmail()
    })
    this.message.addEventListener('focusout', () => {
      this.checkMessage()
    })
    // add event listener on the submit button which triggers a callback function for validation
    this.submit.addEventListener('click', (e) => {
      this.dialogContainer.innerHTML = ''
      this.dialogContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="contact__confirm cta">OK</button>`
      )
      if (
        !this.checkFirstName() ||
        !this.checkLastName() ||
        !this.checkEmail() ||
        !this.checkMessage()
      ) {
        // displays an error dialog when validation fails
        this.dialogContainer.insertAdjacentHTML(
          'afterbegin',
          `<p class="contact__error">Un ou plus champs sont manquants ou erronés. Veuillez corriger.</p>`
        )
        document
          .querySelector('.contact__confirm')
          .addEventListener('click', () => {
            this.dialogContainer.style.display = 'none'
          })
        this.dialogContainer.style.display = 'block'
        e.preventDefault()
      } else {
        // displays an success dialog
        this.dialogContainer.insertAdjacentHTML(
          'afterbegin',
          `<p class="contact__success">Message envoyé !</p>`
        )
        document
          .querySelector('.contact__confirm')
          .addEventListener('click', () => {
            this.dialogContainer.style.display = 'none'
            document.querySelector('.contact').style.display = 'none'
          })
        document.querySelector('.contact__modal').style.display = 'none'
        this.dialogContainer.style.display = 'block'
        e.preventDefault()
      }
    })
  }

  checkFirstName() {
    if (
      this.firstName.value.trim() === '' ||
      this.firstName.value.trim().length < 2 ||
      !this.regexAlpha.test(this.firstName.value.trim())
    ) {
      this.firstName.parentElement.setAttribute('data-error-visible', 'true')
      return false
    }
    this.firstName.parentElement.setAttribute('data-error-visible', 'false')
    return true
  }

  checkLastName() {
    if (
      this.lastName.value.trim() === '' ||
      this.lastName.value.trim().length < 2 ||
      !this.regexAlpha.test(this.lastName.value.trim())
    ) {
      this.lastName.parentElement.setAttribute('data-error-visible', 'true')
      return false
    }
    this.lastName.parentElement.setAttribute('data-error-visible', 'false')
    return true
  }

  checkEmail() {
    if (
      this.email.value.trim() === '' ||
      !this.regexEmail.test(this.email.value.trim())
    ) {
      this.email.parentElement.setAttribute('data-error-visible', 'true')
      return false
    }
    this.email.parentElement.setAttribute('data-error-visible', 'false')
    return true
  }

  checkMessage() {
    if (
      this.message.value.trim() === '' ||
      this.message.value.trim().length > 500
    ) {
      this.message.parentElement.setAttribute('data-error-visible', 'true')
      return false
    }
    this.message.parentElement.setAttribute('data-error-visible', 'false')
    return true
  }
}
