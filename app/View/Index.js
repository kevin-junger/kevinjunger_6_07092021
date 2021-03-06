import Photographer from '../Model/Photographer.js'

/**
 * Index
 * View class for displaying the main page
 */

export default class Index {
  constructor(photographers) {
    // DOM elements (navbar and container)
    this.mainContainer = document.querySelector('.container')
    this.navbar = document.querySelector('.navbar')
    // Data
    this.menu = [
      // contains all the tags used on the website - will be used to generate the menu
      'portrait',
      'art',
      'fashion',
      'architecture',
      'travel',
      'sport',
      'animals',
      'events',
    ]
    this.photographers = photographers.map(
      // contains each photographer
      (photographer) => new Photographer(photographer)
    )
  }

  init() {
    this.displayMenu() // initiates the menu bar
    this.mainContainer.classList.add('index') // for CSS purposes
    this.mainContainer.setAttribute('aria-label', 'liste photographes')
    this.mainContainer.setAttribute('tabindex', '0')
    // checks if the URL contains the 'tag' GET parameters, which means a tag has been clicked in the menu bar (for ex. 'art')
    const url = new URLSearchParams(window.location.search)
    if (url.has('tag') === true) {
      this.displayIndexByTag(url.get('tag')) // regenerate the page with only the photographers associated to the 'art' tag (for ex.)
    } else {
      this.displayIndex() // displays all the photographers (default)
    }
  }

  displayMenu() {
    // generates and displays the menu bar
    const menu = document.createElement('ul')
    menu.className = 'navbar__menu tags'
    menu.setAttribute('role', 'menu')
    menu.innerHTML = `${this.menu
      .map(
        (element) =>
          `<li class="navbar__item tags__tag" role="menuitem"><a href="?tag=${element}">#${element}</a></li>`
      )
      .join(' ')}`
    this.navbar.appendChild(menu)
    this.navbar.insertAdjacentHTML(
      'beforeend',
      `<h1 class="navbar__header">Nos photographes</h1>`
    )
  }

  displayIndex() {
    // display all photographers present in the array
    this.photographers.forEach((photographer) => {
      this.displayPhotographer(photographer)
    })
  }

  displayIndexByTag(tag) {
    // when the user clicks on any item in the menu bar (generated by displayMenu()), displays each photographer associated with the chosen tag
    this.photographers.forEach((photographer) => {
      photographer.tags.forEach((element) => {
        if (element === tag) {
          this.displayPhotographer(photographer)
        }
      })
    })
  }

  displayPhotographer(data) {
    // generates a card for the photographer and appends it to the container
    const card = document.createElement('figure')
    card.className = 'photographer'
    const html = `
      <a class="photographer__link" href="?profile=${data.getId()}">
        <img class="photographer__pic" loading="lazy" src="public/content/photographers/${data.getPortrait()}" alt="portrait ${data.getName()}" />
        <h2 class="photographer__name">${data.getName()}</h2>
      </a>
      <h3 class="photographer__location">${data.getLocation()}</h3>
      <blockquote class="photographer__quote">${data.getTagline()}</blockquote>
      <h4 class="photographer__price">${data.getPrice()}</h4>
      <ul class="photographer__tags tags">
        ${data
          .getTags()
          .map(
            (tag) =>
              `<li class="photographer__tag tags__tag"><a href="?tag=${tag}">#${tag}</a></li>`
          )
          .join(' ')}
      </ul>
    `
    card.innerHTML = html
    this.mainContainer.appendChild(card)
  }
}
