export default class Modal {
  constructor() {
    if (Modal.exists) {
      return Modal.instance
    }
    Modal.instance = this
    Modal.exists = true
    return this
  }

  get() {
    document.querySelector('.contact').style.display = 'block'
    document.querySelector('.contact__close').addEventListener('click', () => {
      document.querySelector('.contact').style.display = 'none'
    })
  }
}
