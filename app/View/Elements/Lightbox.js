export default class Lightbox {
  constructor(media) {
    this.galleryElements = media
    this.lightboxContainer = document.querySelector('.lightbox')
    this.lightboxContent = document.querySelector('.lightbox__content')
    this.lightboxPrevious = document.querySelector('.lightbox__previous')
    this.lightboxNext = document.querySelector('.lightbox__next')
    this.lightboxClose = document.querySelector('.lightbox__close')
  }

  init(index) {
    this.mediumIndex = index
    this.lightboxContainer.style.display = 'block'
    this.lightboxPrevious.addEventListener('click', () => {
      this.display('previous')
    })
    this.lightboxNext.addEventListener('click', () => {
      this.display('next')
    })
    this.lightboxClose.addEventListener('click', () => {
      this.lightboxContainer.style.display = 'none'
    })
    document.addEventListener('keydown', (e) => {
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
    switch (context) {
      case 'previous':
        this.mediumIndex -= 1
        break
      case 'next':
        this.mediumIndex += 1
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
