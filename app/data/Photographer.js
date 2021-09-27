import MediaFactory from './MediaFactory.js'

export default class Photographer {
  constructor(data) {
    this.data = data
  }

  displayProfile(context) {
    switch (context) {
      case 'index':
        document.querySelector('.container').innerHTML += `
          <figure class="profile">
            <a href="/index.html?profile=${this.data.id}">
              <img class="profile__pic pp--big" src="public/content/photographers/${
                this.data.portrait
              }" alt="${this.data.name}" />
            </a>
            <figcaption class="profile__caption">
              <h2 class="profile__name">${this.data.name}</h2>
              <h3 class="profile__location">${this.data.city}, ${
          this.data.country
        }</h3>
              <blockquote class="profile__quote">${
                this.data.tagline
              }</blockquote>
              <h4 class="profile__price">${this.data.price}€/jour</h4>
              <ul class="profile__tags tags">${this.data.tags
                .map((tag) => `<li class="profile__tag tags__tag">#${tag}</li>`)
                .join(' ')}
              </ul>
            </figcaption>
          </figure>
        `
        break
      case 'profile':
        document.querySelector('.container').innerHTML += `
          <section class="about">
            <img class="about__pic pp" src="public/content/photographers/${
              this.data.portrait
            }" alt="${this.data.name}"
            />
            <h2 class="about__name">${this.data.name}</h2>
            <h3 class="about__location">${this.data.city}, ${
          this.data.country
        }</h3>
            <blockquote class="about__quote">${this.data.tagline}</blockquote>
            <ul class="about__tags tags">${this.data.tags
              .map((tag) => `<li class="about__tag tags__tag">#${tag}</li>`)
              .join(' ')}</ul>
            <button type="button" class="about__contact cta">Contactez-moi</button>
          </section>
        `
        break
      default:
        return undefined
    }
  }

  displayMedium(context, medium) {
    switch (context) {
      case 'image':
        new MediaFactory('image', medium).get()
        break
      case 'video':
        new MediaFactory('video', medium).get()
        break
      default:
        return undefined
    }
  }
}
