import Photographer from '../Model/Photographer.js'
import Gallery from './Gallery.js'
import Modal from './Elements/Modal.js'

export default class Profile {
  constructor(photographer, media) {
    this.mainContainer = document.querySelector('.container')
    this.aboutContainer = document.createElement('section')
    this.aboutContainer.className = 'about'
    this.photographer = new Photographer(photographer)
    this.media = new Gallery(media, this.photographer.getId())
    this.modal = new Modal(this.photographer.getName())
  }

  init() {
    const html = `
      <img class="about__pic pp" src="public/content/photographers/${this.photographer.getPortrait()}" />
      <h2 class="about__name">${this.photographer.getName()}</h2>
      <h3 class="about__location">${this.photographer.getLocation()}</h3>
      <blockquote class="about__quote">${this.photographer.getTagline()}</blockquote>
      <ul class="about__tags tags">
        ${this.photographer
          .getTags()
          .map((tag) => `<li class="about__tag tags__tag">#${tag}</li>`)
          .join(' ')}
      </ul>
    `
    this.aboutContainer.innerHTML = html
    const contactBtn = document.createElement('button')
    contactBtn.className = 'about__contact cta'
    contactBtn.textContent = 'Contactez-moi'
    contactBtn.addEventListener('click', () => {
      this.modal.init()
    })
    this.aboutContainer.appendChild(contactBtn)
    this.mainContainer.appendChild(this.aboutContainer)
    this.media.init()
  }
}
