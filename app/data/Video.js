import Lightbox from '../display/assets/Lightbox.js'

export default class Video {
  constructor(data) {
    this.type = 'Video'
    this.data = data
  }

  get() {
    document.querySelector('.work').innerHTML += `
      <figure class="work__card">
        <video preload="metadata" class="work__display">
          <source 
            src="public/content/media/${this.data.photographerId}/${this.data.video}#t=1" 
            type="video/mp4"
          />
        </video>
        <figcaption class="work__caption">
          <h2 class="work__desc">${this.data.title}</h2>
          <div class="work__like like">
            <span class="like__count">${this.data.likes}</span>
            <i class="like__heart fas fa-heart"></i>
          </div>
        </figcaption>
      </figure>  
    `
    document
      .querySelector('.work__display')
      .addEventListener('click', new Lightbox(this.data, this.type).get())
  }
}
