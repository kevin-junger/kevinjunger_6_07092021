export default class Lightbox {
  constructor(media) {
    this.galleryElements = media
    this.lightboxContainer = document.querySelector('.lightbox')
    this.lightboxContent = document.querySelector('.lightbox__content')
    this.lightboxClose = document.querySelector('.lightbox__close')
  }

  init(index) {
    this.mediumIndex = index
    console.log(this.galleryElements[this.mediumIndex])
    this.lightboxContainer.style.display = 'block'
    this.lightboxClose.addEventListener('click', () => {
      this.lightboxContainer.style.display = 'none'
    })
    this.displayMedia()
  }

  displayMedia() {
    let html = ''
    switch (this.galleryElements[this.mediumIndex].getType()) {
      case 'Image':
        html += `
          <img class="work__display" src="public/content/media/${this.galleryElements[
            this.mediumIndex
          ].getPId()}/${this.galleryElements[
          this.mediumIndex
        ].getImage()}" alt="" />
        `
        break
      case 'Video':
        html += `
          <video preload="auto" controls class="work__display">
            <source 
              src="public/content/media/${this.galleryElements[
                this.mediumIndex
              ].getPId()}/${this.galleryElements[
          this.mediumIndex
        ].getVideo()}#t=0.5"
              type="video/mp4"
            />
          </video>
        `
        break
      default:
        break
    }

    html += `
      <figcaption class="work__caption">
        <h2 class="work__desc">${this.galleryElements[
          this.mediumIndex
        ].getTitle()}</h2>
      </figcaption>
    `
    this.lightboxContent.innerHTML = html
  }
}
