import Media from '../Model/Media.js'
import Lightbox from './Elements/Lightbox.js'

export default class Gallery {
  constructor(media, pId) {
    this.mainContainer = document.querySelector('.container')
    this.sortContainer = document.createElement('aside')
    this.sortContainer.className = 'sort'
    this.galleryContainer = document.createElement('section') // DOM object which will contain the gallery
    this.galleryContainer.className = 'work'
    this.galleryElements = [] // will contain all Media objects corresponding to the chosen Photographer
    media.forEach((element) => {
      // adds all Media objects to the array
      if (element.photographerId === pId) {
        if (!element.video) {
          this.galleryElements.push(new Media(element, 'image'))
        } else {
          this.galleryElements.push(new Media(element, 'video'))
        }
      }
    })
    this.lightbox = new Lightbox(this.galleryElements)
  }

  init() {
    this.displaySortBy()
    this.displayGallery()
  }

  displaySortBy() {
    const select = document.createElement('select')
    select.className = 'sort__select'
    select.innerHTML = `
      <option value="popular">Popularité</option>
      <option value="date">Date</option>
      <option value="title">Titre</option>
    `
    this.sortContainer.innerHTML = `<span class="sort__method">Trier par</span>`
    this.sortContainer.appendChild(select)
    this.mainContainer.appendChild(this.sortContainer)
    const dropdown = document.querySelector('.sort__select')
    const ddOptions = dropdown.querySelectorAll('option')
    dropdown.className = 'sort__hidden'
    const ddWrapper = document.createElement('div')
    ddWrapper.className = 'sort__select'
    dropdown.parentNode.insertBefore(ddWrapper, dropdown)
    ddWrapper.appendChild(dropdown)
    ddWrapper.insertAdjacentHTML(
      'beforeend',
      '<div class="sort__styled"></div>'
    )
    const ddStyled = document.querySelector('.sort__styled')
    ddStyled.innerText = ddOptions[0].textContent
    const ddList = document.createElement('ul')
    ddList.className = 'sort__options'
    ddWrapper.appendChild(ddList)
    ddOptions.forEach((option) => {
      ddList.insertAdjacentHTML(
        'beforeend',
        `<li rel="${option.value}">${option.textContent}</li>`
      )
    })
    const ddListOptions = ddList.querySelectorAll('li')
    ddStyled.addEventListener('click', (e) => {
      e.stopPropagation()
      if (ddStyled.classList.contains('active')) {
        ddStyled.classList.remove('active')
        ddList.style.display = 'none'
      } else {
        ddStyled.classList.toggle('active')
        ddList.style.display = 'block'
      }
    })
    ddListOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation()
        this.displayGallery(`${option.getAttribute('rel')}`)
        ddStyled.innerText = option.textContent
        ddStyled.classList.remove('active')
        ddList.style.display = 'none'
      })
    })
  }

  displayGallery(sortBy) {
    this.galleryContainer.innerHTML = ''
    switch (sortBy) {
      case 'date':
        this.galleryElements.sort((a, b) => a.getDate() - b.getDate())
        break
      case 'title':
        this.galleryElements.sort((a, b) =>
          a.getTitle().localeCompare(b.getTitle())
        )
        break
      default:
        this.galleryElements.sort((a, b) => a.getLikes() - b.getLikes())
        break
    }
    // loops the created array of media and displays it all
    this.galleryElements.forEach((element) => {
      const card = document.createElement('figure')
      card.className = 'work__card'
      let html = ''
      switch (
        element.getType() // verifies the Media type
      ) {
        case 'Video':
          html = `
            <video preload="metadata" class="work__display">
              <source 
                src="public/content/media/${element.getPId()}/${element.getVideo()}#t=1"
                type="video/mp4"
              />
            </video>
          `
          break
        default:
          html = `
            <img class="work__display" src="public/content/media/${element.getPId()}/${element.getImage()}" alt="" />
          `
          break
      }
      html += `
        <figcaption class="work__caption">
          <h2 class="work__desc">${element.getTitle()}</h2>
          <div class="work__like like">
            <span class="like__count">${element.getLikes()}</span>
            <i class="like__heart fas fa-heart"></i>
          </div>
        </figcaption>
      `
      card.innerHTML = html
      card.querySelector('.work__display').addEventListener('click', () => {
        this.lightbox.init(parseInt(this.galleryElements.indexOf(element), 10))
      })
      const likeBtn = card.querySelector('.like__heart')
      likeBtn.addEventListener('click', () => {
        let nbLikes = element.getLikes()
        if (likeBtn.classList.contains('liked')) {
          likeBtn.classList.remove('liked')
          element.setLikes((nbLikes -= 1))
        } else {
          likeBtn.classList.toggle('liked')
          element.setLikes((nbLikes += 1))
        }
        card.querySelector('.like__count').innerHTML = element.getLikes()
      })
      this.galleryContainer.appendChild(card)
    })
    this.mainContainer.appendChild(this.galleryContainer)
  }
}
