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
    this.mainContainer.classList.add('index')
    this.profiles.forEach((element) => {
      const card = document.createElement('figure')
      card.className = 'photographer'
      const html = `
        <a class="photographer__link" href="?profile=${element.getId()}">
          <img class="photographer__pic" src="public/content/photographers/${element.getPortrait()}" />
          <h2 class="photographer__name">${element.getName()}</h2>
        </a>
        <h3 class="photographer__location">${element.getLocation()}</h3>
        <blockquote class="photographer__quote">${element.getTagline()}</blockquote>
        <h4 class="photographer__price">${element.getPrice()}</h4>
        <ul class="photographer__tags tags">
          ${element
            .getTags()
            .map(
              (tag) => `<li class="photographer__tag tags__tag">#${tag}</li>`
            )
            .join(' ')}
        </ul>
      `
      card.innerHTML = html
      this.mainContainer.appendChild(card)
    })
  }
}
