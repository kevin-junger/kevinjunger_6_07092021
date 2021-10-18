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
    this.lightboxContent =
      this.lightboxContainer.querySelector('.lightbox__content')
    this.lightboxPrevious = this.lightboxContainer.querySelector(
      '.lightbox__previous'
    )
    this.lightboxNext = this.lightboxContainer.querySelector('.lightbox__next')
    this.lightboxClose =
      this.lightboxContainer.querySelector('.lightbox__close')
  }

  init(mediumIndex) {
    // generates and displays the lightbox and the selected medium
    this.mediumIndex = mediumIndex // the index for the select medium in the array
    this.lightboxContainer.style.display = 'block'
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
          break
        default:
          break
      }
    })
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
          <video autoplay controls class="lightbox__display">
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
        ].getImage()}" alt="" />
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
