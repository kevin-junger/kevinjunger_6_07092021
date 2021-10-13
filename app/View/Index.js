import Photographer from '../Model/Photographer.js'

export default class Index {
  constructor(photographers) {
    this.mainContainer = document.querySelector('.container')
    this.navbar = document.querySelector('.navbar')
    this.menu = [
      'portrait',
      'art',
      'fashion',
      'architecture',
      'travel',
      'sport',
      'animals',
      'events',
    ]
    this.profiles = []
    photographers.forEach((element) => {
      this.profiles.push(new Photographer(element))
    })
  }

  init() {
    const menu = document.createElement('ul')
    menu.className = 'navbar__menu tags'
    this.menu.forEach((element) => {
      const item = document.createElement('li')
      item.className = 'navbar__item tags__tag'
      item.innerText = `#${element}`
      menu.appendChild(item)
    })
    this.navbar.appendChild(menu)
    this.navbar.insertAdjacentHTML(
      'beforeend',
      `<h2 class="navbar__header">Nos photographes</h2>`
    )
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
