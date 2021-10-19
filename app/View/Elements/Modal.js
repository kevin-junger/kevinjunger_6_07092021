import Form from './Form.js'

/**
 * Modal
 * Used in the Profile view
 * Displays the modal which contains the contact form
 */

export default class Modal {
  constructor(pName) {
    // HTML content for modal header
    this.modalHeader = `<h2 class="contact__header">Contactez-moi<br/>${pName}</h2>`
    // DOM element - modal container
    this.modalContainer = document.querySelector('.contact')
    // Form object
    this.form = new Form()
  }

  init() {
    // generates and displays modal and form
    if (this.modalContainer.querySelector('.contact__header') !== null) {
      this.modalContainer.querySelector('.contact__header').remove()
    }
    this.modalContainer.style.display = 'block'
    const modal = this.modalContainer.querySelector('.contact__modal')
    modal.style.display = 'block'
    const modalClose = modal.querySelector('.contact__close')
    modalClose.addEventListener('click', () => {
      this.modalContainer.style.display = 'none'
    })
    modalClose.insertAdjacentHTML('afterend', this.modalHeader)
    this.form.init()
  }
}
