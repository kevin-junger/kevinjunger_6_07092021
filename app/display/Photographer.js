import MediaFactory from "../factory/MediaFactory.js";
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
  }
  async displayMedia() {
    document
      .querySelector(".container")
      .insertAdjacentHTML("beforeend", '<section class="work"></section>');
    this.data.media.forEach((medium) => {
      if (medium.photographerId === this.id) {
        if (typeof medium.image === "undefined") {
          new MediaFactory("video", medium).get()
        } else {
          new MediaFactory("image", medium).get()
        }
      }
    });
  }
}
