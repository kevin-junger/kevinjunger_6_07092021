export default class Modal {
  constructor(pName) {
    this.pName = pName
    this.modalContainer = document.querySelector('.contact')
    this.modalHeader = document.querySelector('.contact__header')
    this.modalClose = document.querySelector('.contact__close')
  }

  init() {
    this.modalContainer.style.display = 'block'
    this.modalHeader.innerHTML += `<br />${this.pName}`
    this.modalClose.addEventListener('click', () => {
      this.modalContainer.style.display = 'none'
    })
  }
}
