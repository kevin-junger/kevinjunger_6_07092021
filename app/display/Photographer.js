export default class Photographer {
  constructor(data, id) {
    if (Photographer.exists) {
      return Photographer.instance;
    }
    this.data = data;
    this.id = id;
    Photographer.instance = this;
    Photographer.exists = true;
    return this;
  }
  async displayProfile() {
    this.data.photographers.forEach((profile) => {
      if (profile.id === this.id) {
        const html = `
          <section class="about">
            <img
              class="about__pic pp"
              src="public/content/photographers/${profile.portrait}"
              alt="${profile.name}"
            />
            <h2 class="about__name">${profile.name}</h2>
            <h3 class="about__location">
              ${profile.city}, ${profile.country}
            </h3>
            <blockquote class="about__quote">
              ${profile.tagline}
            </blockquote>
            <ul class="about__tags tags">
              ${profile.tags
                .map((tag) => `<li class="about__tag tags__tag">#${tag}</li>`)
                .join(" ")}
            </ul><button type="button" class="about__cta cta">
            <button type="button" class="about__cta cta">
              Contactez-moi
            </button>
          </section>
        `;
        document.querySelector(".container").innerHTML = html;
      }
    });
    document
      .querySelector(".container")
      .insertAdjacentHTML("beforeend", '<section class="work"></section>');
  }
  async displayMedia() {
    this.data.media.forEach((medium) => {
      if (medium.photographerId === this.id) {
        let html = '<figure class="work__card">';
        if (typeof medium.image === "undefined") {
          html += `
            <video controls class="work__display">
              <source 
                src="public/content/media/${medium.photographerId}/${medium.video}" 
                type="video/mp4"
              />
            </video>
          `;
        } else {
          html += `
            <img
              class="work__display"
              src="public/content/media/${medium.photographerId}/${medium.image}"
              alt=""
            />
          `;
        }
        html += `
              <figcaption class="work__caption">
              <h2 class="work__desc">${medium.title}</h2>
              <div class="work__like like">
                <span class="like__count">${medium.likes}</span>
                <i class="like__heart fas fa-heart"></i>
              </div>
            </figcaption>
          </figure>
        `;
        document.querySelector(".work").innerHTML += html;
      }
    });
  }
}
