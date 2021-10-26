import Photographer from '../Model/Photographer.js'
import Gallery from './Elements/Gallery.js'
import Modal from './Elements/Modal.js'

/**
 * Profile
 * View class for displaying a photographer's profile
 */

export default class Profile {
  constructor(photographer, media) {
    // DOM element (main container)
    this.mainContainer = document.querySelector('.container')
    // Objects (selected photographer, the gallery containing its portfolio, the modal containing the contact form)
    this.photographer = new Photographer(photographer)
    this.gallery = new Gallery(media, this.photographer.getId())
    this.modal = new Modal(this.photographer.getName())
  }

  init() {
    this.mainContainer.classList.add('profile') // for CSS purposes
    this.mainContainer.setAttribute('aria-label', 'profil photographe')
    this.mainContainer.setAttribute('tabindex', '0')
    this.displayAbout()
    this.gallery.init()
    this.displayLikesAndPrice()
    this.likeButtons = document.querySelectorAll('.like__heart')
    this.likeButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.updateLikesTotal()
      })
    })
  }

  displayAbout() {
    // generates and displays the About section (contains the photographer's info)
    this.aboutContainer = document.createElement('section')
    this.aboutContainer.className = 'about'
    this.aboutContainer.setAttribute('aria-label', 'a propos')
    this.aboutContainer.setAttribute('tabindex', '0')
    const html = `
      <div class="about__info">
        <h2 class="about__name">${this.photographer.getName()}</h2>
        <h3 class="about__location">${this.photographer.getLocation()}</h3>
        <blockquote class="about__quote">${this.photographer.getTagline()}</blockquote>
        <ul class="about__tags tags">
          ${this.photographer
            .getTags()
            .map(
              (tag) =>
                `<li class="about__tag tags__tag"><a href="?tag=${tag}">#${tag}</a></li>`
            )
            .join(' ')}
        </ul>
      </div>
      <button class="about__contact cta">Contactez-moi</button>
      <img class="about__pic" src="public/content/photographers/${this.photographer.getPortrait()}" alt="portrait ${this.photographer.getName()}" />
    `
    this.aboutContainer.innerHTML = html
    // generates the contact button with the event listener which triggers the modal opening
    const contactBtn = this.aboutContainer.querySelector('.about__contact')
    contactBtn.addEventListener('click', () => {
      this.modal.init()
    })
    this.mainContainer.appendChild(this.aboutContainer)
  }

  displayLikesAndPrice() {
    // generates and displays a small tab (only visible on desktop) which contains the total of likes and the asking price
    this.likesAndPriceContainer = document.createElement('aside')
    this.likesAndPriceContainer.className = 'likes-price'
    this.likesAndPriceContainer.innerHTML = `
      <span class="likes-price__total">${this.gallery.getLikesTotal()}<em class="fas fa-heart"></em></span>
      <span class="likes-price__price">${this.photographer.getPrice()}</span>
    `
    this.mainContainer.appendChild(this.likesAndPriceContainer)
  }

  updateLikesTotal() {
    document.querySelector(
      '.likes-price__total'
    ).innerHTML = `${this.gallery.getLikesTotal()}<em class="fas fa-heart"></em>`
  }
}
