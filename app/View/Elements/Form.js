export default class Form {
  constructor() {
    this.names = document.querySelectorAll('.form__input[type="text"]')
    this.email = document.querySelector('.form__input[type="email"]')
    this.message = document.querySelector('.form_message')
    this.submit = document.querySelector('.form__submit')
    this.regexAlpha = /^[a-zA-ZÀ-ÖØ-öø-ÿ- \s]+$/
    this.regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  init() {
    this.submit.addEventListener('click', (e) => {
      if (!this.checkName() || !this.checkEmail() || !this.checkMessage()) {
        window.alert(
          'Une ou plusieurs informations sont manquantes ou incorrectes.'
        )
        e.preventDefault()
      } else {
        window.alert('OK')
        e.preventDefault()
      }
    })
  }

  checkName() {
    this.names.forEach((name) => {
      if (
        name.value.trim() === '' ||
        name.value.trim().length < 2 ||
        this.regexAlpha.test(name.value.trim()) === false
      ) {
        return false
      }
      return true
    })
  }

  checkEmail() {
    if (
      this.email.value.trim() === '' ||
      this.regexEmail.test(this.email.value.trim()) === false
    ) {
      return false
    }
    return true
  }

  checkMessage() {
    if (this.message.value.trim() === '') {
      return false
    }
    return true
  }
}
