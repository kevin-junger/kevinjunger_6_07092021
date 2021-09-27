export default class Image {
  constructor(data) {
    this.type = 'Image'
    this.data = data
  }

  get() {
    document.querySelector('.work').innerHTML += `
      <figure class="work__card">  
        <img class="work__display" id="${this.data.id}" src="public/content/media/${this.data.photographerId}/${this.data.image}" alt="" />
        <figcaption class="work__caption">
          <h2 class="work__desc">${this.data.title}</h2>
          <div class="work__like like">
            <span class="like__count">${this.data.likes}</span>
            <i class="like__heart fas fa-heart"></i>
          </div>
        </figcaption>
      </figure>  
    `
  }
}
