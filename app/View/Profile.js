import Photographer from '../Model/Photographer.js'
import Gallery from './Gallery.js'
import Modal from './Elements/Modal.js'

export default class Profile {
  constructor(photographer, media) {
    this.mainContainer = document.querySelector('.container')
    this.aboutContainer = document.createElement('section')
    this.aboutContainer.className = 'about'
    this.likesAndPriceContainer = document.createElement('aside')
    this.likesAndPriceContainer.className = 'likes-price'
    this.photographer = new Photographer(photographer)
    this.media = media
    this.gallery = new Gallery(this.media, this.photographer.getId())
    this.modal = new Modal(this.photographer.getName())
  }

  init() {
    this.mainContainer.innerHTML = ''
    this.mainContainer.classList.add('profile')
    const html = `
      <img class="about__pic" src="public/content/photographers/${this.photographer.getPortrait()}" />
      <div class="about__info">
        <button class="about__contact cta">Contactez-moi</button>
        <h2 class="about__name">${this.photographer.getName()}</h2>
      </div>
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
    const contactBtn = this.aboutContainer.querySelector('.about__contact')
    contactBtn.addEventListener('click', () => {
      this.modal.init()
    })
    this.mainContainer.appendChild(this.aboutContainer)
    this.gallery.init()
    let likesCount = 0
    this.media.forEach((element) => {
      if (element.photographerId === this.photographer.getId()) {
        likesCount += element.likes
      }
    })
    this.likesAndPriceContainer.innerHTML = `
      <span>${likesCount}</span>
      <i class="fas fa-heart"></i>
      <span>${this.photographer.getPrice()}</span>
    `
    this.mainContainer.appendChild(this.likesAndPriceContainer)
  }
}
