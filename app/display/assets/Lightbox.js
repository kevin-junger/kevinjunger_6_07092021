export default class Lightbox {
  constructor(data, type) {
    this.data = data
    this.type = type
  }

  get() {
    switch (this.type) {
      case 'Image':
        document.querySelector('.lightbox__content').innerHTML = `
          <img class="work__display" id="${this.data.id}" src="public/content/media/${this.data.photographerId}/${this.data.image}" alt="" />
          <figcaption class="work__caption">
            <h2 class="work__desc">${this.data.title}</h2>
            <div class="work__like like">
              <span class="like__count">${this.data.likes}</span>
              <i class="like__heart fas fa-heart"></i>
            </div>
          </figcaption>
        `
        break
      case 'Video':
        document.querySelector('.lightbox__content').innerHTML = `
          <video controls autoplay class="work__display" id="${this.data.id}">
            <source 
              src="public/content/media/${this.data.photographerId}/${this.data.video}" 
              type="video/mp4"
            />
          </video>
          <figcaption class="work__caption">
            <h2 class="work__desc">${this.data.title}</h2>
          </figcaption>
        `
        break
      default:
        return undefined
    }
    /* document.querySelector('.lightbox').style.display = 'block'
    document.querySelector('.lightbox__close').addEventListener('click', () => {
      document.querySelector('.lightbox').style.display = 'none'
    }) */
  }
}
