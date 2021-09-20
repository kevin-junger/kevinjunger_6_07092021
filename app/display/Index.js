export default class Index {
  constructor(data) {
    if (Index.exists) {
      return Index.instance;
    }
    this.data = data;
    Index.instance = this;
    Index.exists = true;
    return this;
  }
  async display() {
    this.data.photographers.forEach((photographer) => {
      const html = `
      <figure class="profile">
        <a href="/index.html?photographer=${
          photographer.id
        }"><img class="profile__pic pp--big"
          src="public/content/photographers/${photographer.portrait}"
          alt="${photographer.name}"
        /></a>
        <figcaption class="profile__caption">
        <a href="/index.html?photographer=${
          photographer.id
        }"><h2 class="profile__name">${photographer.name}</h2></a>
          <h3 class="profile__location">
            ${photographer.city}, ${photographer.country}
          </h3>
          <blockquote class="profile__quote">
            ${photographer.tagline}
          </blockquote>
          <h4 class="profile__price">${photographer.price}€/jour</h4>
          <ul class="profile__tags tags">
            ${photographer.tags
              .map((tag) => `<li class="profile__tag tags__tag">#${tag}</li>`)
              .join(" ")}
          </ul>
        </figcaption>
      </figure>
    `;
      document.querySelector(".container").innerHTML += html;
    });
  }
}
