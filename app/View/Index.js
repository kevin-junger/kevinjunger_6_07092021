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
    this.photographers = []
    photographers.forEach((photographer) => {
      this.photographers.push(new Photographer(photographer))
    })
  }

  init(tag) {
    this.displayNavbar()
    this.mainContainer.classList.add('index')
    if (!tag) {
      this.displayIndex()
    } else {
      this.displayIndexByTag(tag)
    }
  }

  displayNavbar() {
    const menu = document.createElement('ul')
    menu.className = 'navbar__menu tags'
    this.menu.forEach((element) => {
      const item = document.createElement('li')
      item.className = 'navbar__item tags__tag'
      item.innerHTML = `<a href="?tag=${element}">#${element}</a>`
      menu.appendChild(item)
    })
    this.navbar.appendChild(menu)
    this.navbar.insertAdjacentHTML(
      'beforeend',
      `<h2 class="navbar__header">Nos photographes</h2>`
    )
  }

  displayIndex() {
    this.photographers.forEach((photographer) => {
      this.displayPhotographer(photographer)
    })
  }

  displayIndexByTag(tag) {
    this.photographers.forEach((photographer) => {
      photographer.tags.forEach((e) => {
        if (e === tag) {
          this.displayPhotographer(photographer)
        }
      })
    })
  }

  displayPhotographer(data) {
    const card = document.createElement('figure')
    card.className = 'photographer'
    const html = `
      <a class="photographer__link" href="?profile=${data.getId()}">
        <img class="photographer__pic" src="public/content/photographers/${data.getPortrait()}" />
        <h2 class="photographer__name">${data.getName()}</h2>
      </a>
      <h3 class="photographer__location">${data.getLocation()}</h3>
      <blockquote class="photographer__quote">${data.getTagline()}</blockquote>
      <h4 class="photographer__price">${data.getPrice()}</h4>
      <ul class="photographer__tags tags">
        ${data
          .getTags()
          .map((tag) => `<li class="photographer__tag tags__tag">#${tag}</li>`)
          .join(' ')}
      </ul>
    `
    card.innerHTML = html
    this.mainContainer.appendChild(card)
  }
}
