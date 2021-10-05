export default class Form {
  constructor() {
    this.inputs = document.querySelectorAll('.form__input')
    this.submit = document.querySelector('.form__submit')
    this.regexAlpha = /^[a-zA-ZÀ-ÖØ-öø-ÿ- \s]+$/
    this.regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  init() {
    this.submit.addEventListener('click', (e) => {
      if (
        !this.checkFirstName() ||
        !this.checkLastName() ||
        !this.checkEmail()
      ) {
        console.log('prout')
        e.preventDefault()
      }
    })
  }

  checkFirstName() {
    if (
      this.inputs[0].value.trim() === '' ||
      !this.regexAlpha.test(this.inputs[0].value.trim())
    ) {
      console.log(false)
      return false
    }
    console.log(true)
    return true
  }

  checkLastName() {
    if (
      this.inputs[1].value.trim() === '' ||
      !this.regexAlpha.test(this.inputs[1].value.trim())
    ) {
      console.log(false)
      return false
    }
    console.log(true)
    return true
  }

  checkEmail() {
    if (
      this.inputs[2].value.trim() === '' ||
      !this.regexEmail.test(this.inputs[2].value.trim())
    ) {
      console.log(false)
      return false
    }
    console.log(true)
    return true
  }
}
