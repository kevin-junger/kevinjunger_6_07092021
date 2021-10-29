/**
 * Lightbox
 * Used in the Profile view - displays the selected media in full screen, with navigation on click or via keyboard inputs
 */

export default class Lightbox {
  constructor(media) {
    // Media array
    this.galleryElements = media
    // DOM elements - main container, content container, prev/next buttons, close button
    this.lightboxContainer = document.querySelector('.lightbox')
  }

  init(mediumIndex) {
    // generates and displays the lightbox and the selected medium
    this.mediumIndex = mediumIndex // the index for the select medium in the array
    this.lightboxContainer.innerHTML = `
      <div class="lightbox__modal">
        <button
          class="lightbox__previous"
          aria-label="bouton image précédente"
        >
          <em class="fas fa-chevron-left"></em>
        </button>
        <div class="lightbox__wrapper">
          <button class="lightbox__close" aria-label="button fermer">
            <em class="fas fa-times"></em>
          </button>
          <section
            class="lightbox__content"
            role="region"
            aria-live="polite"
            tabindex="0"
          ></section>
          <h2 class="lightbox__caption"></h2>
        </div>
        <button class="lightbox__next" aria-label="bouton image suivante">
          <em class="fas fa-chevron-right"></em>
        </button>
      </div>
    `
    this.lightboxContent =
      this.lightboxContainer.querySelector('.lightbox__content')
    this.lightboxPrevious = this.lightboxContainer.querySelector(
      '.lightbox__previous'
    )
    this.lightboxNext = this.lightboxContainer.querySelector('.lightbox__next')
    this.lightboxClose =
      this.lightboxContainer.querySelector('.lightbox__close')
    this.lightboxPrevious.addEventListener('click', () => {
      // previous button
      this.display('previous')
    })
    this.lightboxNext.addEventListener('click', () => {
      // next button
      this.display('next')
    })
    this.lightboxClose.addEventListener('click', () => {
      // close button
      this.lightboxContainer.style.display = 'none'
      this.lightboxContent.innerHTML = ''
      document
        .getElementById(`${this.galleryElements[this.mediumIndex].getId()}`)
        .parentElement.focus()
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
            .parentElement.focus()
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

  displayMedia() {
    let html = ''
    switch (this.galleryElements[this.mediumIndex].getType()) {
      case 'Video':
        html += `
          <video autoplay controls class="lightbox__display" id="display" aria-label="vidéo ${this.galleryElements[
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
          <img class="lightbox__display" id="display" src="public/content/media/${this.galleryElements[
            this.mediumIndex
          ].getPId()}/${this.galleryElements[
          this.mediumIndex
        ].getImage()}" alt="image ${this.galleryElements[
          this.mediumIndex
        ].getTitle()} - ${this.galleryElements[
          this.mediumIndex
        ].getAlt()} - gauche pour image précédente, droite pour suivante, échap pour quitter" />
        `
        break
    }
    this.lightboxContent.innerHTML = html
    this.lightboxContainer.querySelector('.lightbox__caption').innerText = `${this.galleryElements[
      this.mediumIndex
    ].getTitle()}`
    this.lightboxContent.setAttribute('aria-describedby', 'display')
    this.lightboxContent.focus()
  }

  displayButtons() {
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
