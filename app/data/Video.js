export default class Video {
  constructor(data) {
    this.type = "Video"
    this.data = data
  }
  async get(){
    document.querySelector(".work").innerHTML += `
      <figure class="work__card">  
        <video controls class="work__display">
          <source 
            src="public/content/media/${this.data.photographerId}/${this.data.video}" 
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
  }
}