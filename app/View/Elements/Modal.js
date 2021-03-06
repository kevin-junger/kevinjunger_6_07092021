/**
 * Modal
 * Used in the Profile view
 * Displays the modal which contains the contact form
 */

export default class Modal {
  constructor(pName) {
    // HTML content for modal header
    this.contactHeaderContent = `Contactez-moi<br/>${pName}`
    // DOM element - modal container
    this.contactContainer = document.querySelector('.contact')
    this.dialogContainer = document.querySelector('.dialog')
    // Regular expressions for data validation
    this.regexAlpha = /^[a-zA-ZÀ-ÖØ-öø-ÿ- \s]+$/
    this.regexEmail =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }

  init() {
    // generates and displays modal and form
    // modal wrapper
    this.contact = document.createElement('div')
    this.contact.className = 'contact__modal'
    // close btn
    this.contactCloseBtn = document.createElement('button')
    this.contactCloseBtn.className = 'contact__close'
    this.contactCloseBtn.setAttribute('tabindex', '-1')
    this.contactCloseBtn.innerHTML = `<em class="fas fa-times"></em>`
    this.contactCloseBtn.addEventListener('click', () => { // close btn event listener
      this.contactContainer.style.display = 'none'
      this.contactContainer.innerHTML = ''
      document.querySelector('.about__contact').focus()
    })
    document.addEventListener('keydown', (e) => { // Esc key event listener
      if (e.key === 'Escape') {
        this.contactContainer.style.display = 'none'
        this.contactContainer.innerHTML = ''
        document.querySelector('.about__contact').focus()
      }
    })
    // modal header
    this.contactHeader = document.createElement('h2')
    this.contactHeader.className = 'contact__header'
    this.contactHeader.innerHTML = `${this.contactHeaderContent}`
    // form wrapper
    this.contactForm = document.createElement('section')
    this.contactForm.className = 'contact__form'
    this.contactForm.setAttribute(
      'aria-label',
      'formulaire de contact - échap pour quitter'
    )
    this.contactForm.setAttribute('tabindex', '0')
    // form template
    this.contactForm.innerHTML = `
      <form>
        <div
          class="form__data"
          data-error="Erreur : veuillez saisir un prénom valide (minimum 2 caractères)"
        >
          <label for="first">Prénom</label>
          <input
            type="text"
            minlength="2"
            class="form__input"
            name="first"
            id="first"
          />
          <strong class="form__error"
          role="alert"
          aria-live="assertive"></strong>
        </div>
        <div
          class="form__data"
          data-error="Erreur : veuillez saisir un nom valide (minimum 2 caractères)"
        >
          <label for="last">Nom</label>
          <input
            type="text"
            minlength="2"
            class="form__input"
            name="last"
            id="last"
          />
          <strong class="form__error"
          role="alert"
          aria-live="assertive"></strong>
        </div>
        <div
          class="form__data"
          data-error="Erreur : veuillez saisir une adresse email valide"
        >
          <label for="email">Email</label>
          <input
            type="email"
            class="form__input"
            name="email"
            id="email"
          />
          <strong class="form__error"
          role="alert"
          aria-live="assertive"></strong>
        </div>
        <div
          class="form__data"
          data-error="Erreur : veuillez saisir un message (maximum 500 caractères)"
        >
          <label for="message">Message</label>
          <textarea
            maxlength="500"
            class="form__message"
            name="message"
            id="message"
          ></textarea>
          <strong class="form__error"
            role="alert"
            aria-live="assertive"></strong>
        </div>
        <input type="submit" class="cta form__submit" value="Envoyer" />
      </form>
    `
    // adds all that stuff to the modal wrapper
    this.contact.appendChild(this.contactCloseBtn)
    this.contact.appendChild(this.contactHeader)
    this.contact.appendChild(this.contactForm)
    // adds the wrapper to container
    this.contactContainer.appendChild(this.contact)
    this.initForm() // initiates the form
    this.contactContainer.style.display = 'block'
    this.contactForm.focus()
  }

  initForm() { // contains everything related to form verification and submission
    // DOM elements - form fields, textarea and submit btn
    this.firstName = document.querySelector('.form__input[name="first"]')
    this.lastName = document.querySelector('.form__input[name="last"]')
    this.email = document.querySelector('.form__input[name="email"]')
    this.message = document.querySelector('.form__message')
    this.submit = document.querySelector('.form__submit')
    // add event listeners on each element to check the user's input when it loses focus
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
      this.validate()
      e.preventDefault()
    })
  }

  // complete validation method
  
  validate() {
    // creates the dialog boxes and commands every check before submitting
    // dialog box template
    this.dialog = document.createElement('div')
    this.dialog.className = 'dialog__modal'
    this.dialogOkBtn = document.createElement('button')
    this.dialogOkBtn.className = 'cta dialog__ok'
    this.dialogText = document.createElement('p')
    this.dialogText.className = 'dialog__text'
    this.dialogText.setAttribute('role', 'alert')
    this.dialogText.setAttribute('aria-live', 'assertive')
    // checking any any field, etc. is falsely completed
    if (
      !this.checkFirstName() ||
      !this.checkLastName() ||
      !this.checkEmail() ||
      !this.checkMessage()
    ) {
      this.dialogText.innerText =
        'Une ou plusieurs informations sont erronées. Veuillez corriger et réessayer.'
      this.dialogOkBtn.innerText = 'Corriger'
      this.dialogOkBtn.addEventListener('click', () => {
        this.dialogContainer.style.display = 'none'
        this.dialogContainer.innerHTML = ''
        this.contactForm.focus()
      })
    } else { // if all correct
      this.contactContainer.style.display = 'none'
      this.dialogText.innerText = 'Votre message a été envoyé !'
      this.dialogOkBtn.innerText = 'OK'
      console.log(this.firstName.value.trim())
      console.log(this.lastName.value.trim())
      console.log(this.email.value.trim())
      console.log(this.message.value.trim())
      this.dialogOkBtn.addEventListener('click', () => {
        this.dialogContainer.style.display = 'none'
        this.dialogContainer.innerHTML = ''
        document.getElementById('content').focus()
      })
    }
    // populates, displays and focuses on the dialog
    this.dialog.appendChild(this.dialogText)
    this.dialog.appendChild(this.dialogOkBtn)
    this.dialogContainer.appendChild(this.dialog)
    this.dialogContainer.style.display = 'block'
    this.dialogOkBtn.focus()
  }

  // individual checks

  checkFirstName() {
    if (
      this.firstName.value.trim() === '' ||
      this.firstName.value.trim().length < 2 ||
      !this.regexAlpha.test(this.firstName.value.trim())
    ) {
      this.firstName.parentElement.setAttribute('data-error-visible', 'true')
      this.firstName.parentElement.querySelector(
        '.form__error'
      ).innerText = `${this.firstName.parentElement.getAttribute('data-error')}`
      return false
    }
    this.firstName.parentElement.setAttribute('data-error-visible', 'false')
    this.firstName.parentElement.querySelector('.form__error').innerText = ''
    return true
  }

  checkLastName() {
    if (
      this.lastName.value.trim() === '' ||
      this.lastName.value.trim().length < 2 ||
      !this.regexAlpha.test(this.lastName.value.trim())
    ) {
      this.lastName.parentElement.setAttribute('data-error-visible', 'true')
      this.lastName.parentElement.querySelector(
        '.form__error'
      ).innerText = `${this.lastName.parentElement.getAttribute('data-error')}`
      return false
    }
    this.lastName.parentElement.setAttribute('data-error-visible', 'false')
    this.lastName.parentElement.querySelector('.form__error').innerText = ''
    return true
  }

  checkEmail() {
    if (
      this.email.value.trim() === '' ||
      !this.regexEmail.test(this.email.value.trim())
    ) {
      this.email.parentElement.setAttribute('data-error-visible', 'true')
      this.email.parentElement.querySelector(
        '.form__error'
      ).innerText = `${this.email.parentElement.getAttribute('data-error')}`
      return false
    }
    this.email.parentElement.setAttribute('data-error-visible', 'false')
    this.email.parentElement.querySelector('.form__error').innerText = ''
    return true
  }

  checkMessage() {
    if (
      this.message.value.trim() === '' ||
      this.message.value.trim().length > 500
    ) {
      this.message.parentElement.setAttribute('data-error-visible', 'true')
      this.message.parentElement.querySelector(
        '.form__error'
      ).innerText = `${this.message.parentElement.getAttribute('data-error')}`
      return false
    }
    this.message.parentElement.setAttribute('data-error-visible', 'false')
    this.message.parentElement.querySelector('.form__error').innerText = ''
    return true
  }
}
