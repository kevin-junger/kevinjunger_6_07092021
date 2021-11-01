/**
 * Lightbox
 * Used in the Profile view - displays the selected media in full screen, with navigation on click or via keyboard inputs
 */

export default class Lightbox {
  constructor(media) {
    // Media array
    this.galleryElements = media
    // DOM element - main container
    this.lightboxContainer = document.querySelector('.lightbox')
  }

  init(mediumIndex) {
    // generates and displays the lightbox and the selected medium
    this.mediumIndex = mediumIndex // the index for the select medium in the array
    // inserts the lightbox template 
    this.lightboxContainer.innerHTML = `
      <div class="lightbox__modal">
        <button
          class="lightbox__previous"
          aria-label="bouton image précédente"
        >
          <em class="fas fa-chevron-left"></em>
        </button>
        <div class="lightbox__wrapper">
          <button class="lightbox__close" tabindex="-1">
            <em class="fas fa-times"></em>
          </button>
          <figure
            class="lightbox__content"
          ></figure>
        </div>
        <button class="lightbox__next" aria-label="bouton image suivante">
          <em class="fas fa-chevron-right"></em>
        </button>
      </div>
    `
    // storing DOM elements (content container, buttons)
    this.lightboxContent =
      this.lightboxContainer.querySelector('.lightbox__content')
    this.lightboxPrevious = this.lightboxContainer.querySelector(
      '.lightbox__previous'
    )
    this.lightboxNext = this.lightboxContainer.querySelector('.lightbox__next')
    this.lightboxClose =
      this.lightboxContainer.querySelector('.lightbox__close')
    this.lightboxPrevious.addEventListener('click', () => {
      // previous button event listener
      this.display('previous')
    })
    this.lightboxNext.addEventListener('click', () => {
      // next button event listener
      this.display('next')
    })
    this.lightboxClose.addEventListener('click', () => {
      // close button event listener
      this.lightboxContainer.style.display = 'none'
      this.lightboxContainer.innerHTML = ''
      document
        .getElementById(`${this.galleryElements[this.mediumIndex].getId()}`)
        .parentElement.focus()  // when closing, focus goes on the selected media
    })
    document.addEventListener('keydown', (e) => {
      // event listeners for keyboard inputs
      switch (e.key) {
        case 'ArrowLeft':
          this.display('previous')
          break
        case 'ArrowRight':
          this.display('next')
          break
        case 'Escape':
          this.lightboxContainer.style.display = 'none'
          this.lightboxContent.innerHTML = ''
          document
            .getElementById(`${this.galleryElements[this.mediumIndex].getId()}`)
            .parentElement.focus() // when closing, focus goes on the selected media
          break
        default:
          break
      }
    })
    this.lightboxContainer.style.display = 'block'
    this.display()
  }

  display(context) {
    // displays the medium and the prev/next buttons
    switch (context) {
      case 'previous':
        if (this.mediumIndex > 0) {
          this.mediumIndex -= 1
        }
        break
      case 'next':
        if (this.mediumIndex < this.galleryElements.length - 1) {
          this.mediumIndex += 1
        }
        break
      default:
        break
    }
    this.displayButtons()
    this.displayMedia()
  }

  displayMedia() {  // pretty much self-explanatory
    let html = ''
    switch (this.galleryElements[this.mediumIndex].getType()) {
      case 'Video':
        html += `
          <video autoplay class="lightbox__display" aria-label="vidéo ${this.galleryElements[
            this.mediumIndex
          ].getTitle()} - ${this.galleryElements[
            this.mediumIndex
          ].getAlt()} - gauche pour image précédente, droite pour suivante, échap pour quitter">
            <source 
              src="public/content/media/${this.galleryElements[
                this.mediumIndex
              ].getPId()}/${this.galleryElements[this.mediumIndex].getVideo()}"
              type="video/mp4"
            />
          </video>
        `
        break
      default:
        html += `
          <img class="lightbox__display" src="public/content/media/${this.galleryElements[
            this.mediumIndex
          ].getPId()}/${this.galleryElements[
          this.mediumIndex
        ].getImage()}" alt="image ${this.galleryElements[
          this.mediumIndex
        ].getTitle()} - ${this.galleryElements[
          this.mediumIndex
        ].getAlt()} - bouton gauche pour image précédente, bouton droite pour suivante, échap pour quitter" />
        `
        break
    }    
    html += `
      <figcaption class="lightbox__caption">
        <h2 class="lightbox__desc">${this.galleryElements[
          this.mediumIndex
        ].getTitle()}</h2>
      </figcaption>
    `
    this.lightboxContent.innerHTML = html
    this.lightboxContainer.querySelector('.lightbox__caption').innerText = `${this.galleryElements[
      this.mediumIndex
    ].getTitle()}`
    this.lightboxContent.querySelector('.lightbox__display').setAttribute('tabindex', '0')
    this.lightboxContent.querySelector('.lightbox__display').focus()
  }

  displayButtons() {  // also self-explanatory
    if (this.mediumIndex <= 0) {
      this.lightboxPrevious.style.visibility = 'hidden'
    } else {
      this.lightboxPrevious.style.visibility = 'visible'
    }
    if (this.mediumIndex >= this.galleryElements.length - 1) {
      this.lightboxNext.style.visibility = 'hidden'
    } else {
      this.lightboxNext.style.visibility = 'visible'
    }
  }
}
