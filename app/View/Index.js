import Photographer from '../Model/Photographer.js'

export default class Index {
  constructor(photographers) {
    this.mainContainer = document.querySelector('.container')
    this.profiles = []
    photographers.forEach((element) => {
      this.profiles.push(new Photographer(element))
    })
  }

  init() {
    this.mainContainer.innerHTML = ''
    this.profiles.forEach((element) => {
      const card = document.createElement('figure')
      card.className = 'profile'
      const html = `
        <a class="profile__link" href="?profile=${element.getId()}">
          <img class="profile__pic pp--big" src="public/content/photographers/${element.getPortrait()}" />
          <h2 class="profile__name">${element.getName()}</h2>
        </a>
        <h3 class="profile__location">${element.getLocation()}</h3>
        <blockquote class="profile__quote">${element.getTagline()}</blockquote>
        <h4 class="profile__price">${element.getPrice()}</h4>
        <ul class="profile__tags tags">
          ${element
            .getTags()
            .map((tag) => `<li class="profile__tag tags__tag">#${tag}</li>`)
            .join(' ')}
        </ul>
      `
      card.innerHTML = html
      this.mainContainer.appendChild(card)
    })
  }
}
