export default class Form {
  constructor() {
    this.firstName = document.querySelector('.form__input[name="first"]')
    this.lastName = document.querySelector('.form__input[name="last"]')
    this.email = document.querySelector('.form__input[name="email"]')
    this.message = document.querySelector('.form__message')
    this.submit = document.querySelector('.form__submit')
    this.messageContainer = document.querySelector('.contact__message')
    this.regexAlpha = /^[a-zA-ZÀ-ÖØ-öø-ÿ- \s]+$/
    this.regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  init() {
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
    this.submit.addEventListener('click', (e) => {
      this.messageContainer.innerHTML = ''
      this.messageContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="contact__confirm cta">OK</button>`
      )
      if (
        !this.checkFirstName() ||
        !this.checkLastName() ||
        !this.checkEmail() ||
        !this.checkMessage()
      ) {
        this.messageContainer.insertAdjacentHTML(
          'afterbegin',
          `<p class="contact__error">Un ou plus champs sont manquants ou erronés. Veuillez corriger.</p>`
        )
        document
          .querySelector('.contact__confirm')
          .addEventListener('click', () => {
            this.messageContainer.style.display = 'none'
          })
        this.messageContainer.style.display = 'block'
        e.preventDefault()
      } else {
        this.messageContainer.insertAdjacentHTML(
          'afterbegin',
          `<p class="contact__success">Message envoyé !</p>`
        )
        document
          .querySelector('.contact__confirm')
          .addEventListener('click', () => {
            this.messageContainer.style.display = 'none'
            document.querySelector('.contact').style.display = 'none'
          })
        document.querySelector('.contact__modal').style.display = 'none'
        this.messageContainer.style.display = 'block'
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
