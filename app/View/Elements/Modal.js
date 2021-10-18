import Form from './Form.js'

/**
 * Modal
 * Used in the Profile view
 * Displays the modal which contains the contact form
 */

export default class Modal {
  constructor(pName) {
    // HTML content for modal header
    this.pName = `Contactez-moi<br/>${pName}`
    // DOM element - modal container
    this.modalContainer = document.querySelector('.contact')
    // Form object
    this.form = new Form()
  }

  init() {
    // generates and displays modal and form
    this.modalContainer.style.display = 'block'
    const modal = this.modalContainer.querySelector('.contact__modal')
    modal.style.display = 'block'
    const modalClose = modal.querySelector('.contact__close')
    modalClose.addEventListener('click', () => {
      this.modalContainer.style.display = 'none'
    })
    const modalHeader = modal.querySelector('.contact__header')
    modalHeader.innerHTML = this.pName
    this.form.init()
  }
}
