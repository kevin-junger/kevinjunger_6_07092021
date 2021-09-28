import Media from '../Model/Media.js'

export default class Gallery {
  constructor(media, pId) {
    this.galleryContainer = document.querySelector('.work') // DOM object which will contain the gallery
    this.galleryElements = [] // will contain all Media objects corresponding to the chosen Photographer
    media.forEach((element) => {
      // adds all Media objects to the array
      if (element.photographerId === pId) {
        if (!element.video) {
          this.galleryElements.push(new Media(element, 'image'))
        } else {
          this.galleryElements.push(new Media(element, 'video'))
        }
      }
    })
  }

  init() {
    // loops the created array of media and displays it all
    this.galleryContainer.innerHTML = ''
    this.galleryElements.forEach((element) => {
      const card = document.createElement('figure')
      card.className = 'work__card'
      let html = ''
      switch (
        element.getType() // verifies the Media type
      ) {
        case 'Image':
          html = `
            <img class="work__display" src="public/content/media/${element.getPId()}/${element.getImage()}" alt="" />
          `
          break
        case 'Video':
          html = `
            <video preload="metadata" class="work__display">
              <source 
                src="public/content/media/${element.getPId()}/${element.getVideo()}#t=1"
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
          <h2 class="work__desc">${element.getTitle()}</h2>
          <div class="work__like like">
            <span class="like__count">${element.getLikes()}</span>
            <i class="like__heart fas fa-heart"></i>
          </div>
        </figcaption>
      `
      card.innerHTML = html
      // card.addEventListener('click', console.log('prout'))
      this.galleryContainer.appendChild(card)
    })
  }
}
