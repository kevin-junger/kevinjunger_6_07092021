import Media from '../../Model/Media.js'
import Lightbox from './Lightbox.js'

/**
 * Gallery
 * Used in the Profile view - display the portfolio for the selected photographer
 */

export default class Gallery {
  constructor(media, pId) {
    // DOM element - main container
    this.mainContainer = document.querySelector('.container')
    // Data - contains each media from the photographer's portfolio
    this.galleryElements = []
    media.forEach((element) => {
      // instanciates a Media object (with the right type) and adds it to the array
      if (element.photographerId === pId) {
        if (!element.video) {
          this.galleryElements.push(new Media(element, 'image'))
        } else {
          this.galleryElements.push(new Media(element, 'video'))
        }
      }
    })
    // Lightbox object
    this.lightbox = new Lightbox(this.galleryElements)
  }

  async init() {
    this.displaySort()
    this.displayGallery()
  }

  displaySort() {
    // generates and display the dropdown menu which allows the user to sort the media by popularity, date or name
    const sortContainer = document.createElement('aside')
    sortContainer.className = 'sort'
    sortContainer.innerHTML = `<span class="sort__method" id="sort__method">Trier par</span>`
    const dropdownOptions = [
      {
        value: 'popular',
        text: 'Popularité',
      },
      {
        value: 'date',
        text: 'Date',
      },
      {
        value: 'title',
        text: 'Titre',
      },
    ]
    // creates the wrapper for the stylised dropdown
    const dropdownWrapper = document.createElement('div')
    dropdownWrapper.className = 'sort__wrapper'
    dropdownWrapper.setAttribute('id', 'sort__wrapper')
    sortContainer.appendChild(dropdownWrapper)
    // the stylised dropdown itself
    const dropdownStyled = document.createElement('button')
    dropdownStyled.className = 'sort__button'
    dropdownStyled.setAttribute('aria-haspopup', 'listbox')
    dropdownStyled.setAttribute('aria-labelledby', 'sort__method sort__button')
    dropdownStyled.setAttribute('id', 'sort__button')
    dropdownWrapper.appendChild(dropdownStyled)
    dropdownStyled.innerText = dropdownOptions[0].text // sets the text to the first option
    // creates the dropdown list
    const dropdownList = document.createElement('ul')
    dropdownList.className = 'sort__list'
    dropdownList.setAttribute('id', 'sort__method_list')
    dropdownList.setAttribute('tabindex', '-1')
    dropdownList.setAttribute('role', 'listbox')
    dropdownList.setAttribute('aria-labelledby', 'sort__method')
    dropdownWrapper.appendChild(dropdownList)
    // iterates the options list and feeds them as li nodes to the previously created list
    dropdownOptions.forEach((option) => {
      dropdownList.insertAdjacentHTML(
        'beforeend',
        `<li id="sort__method_${option.value}" rel="${option.value}" role="option">${option.text}</li>`
      )
    })
    /* events listeners on the dropdown menu */
    // event listener on the closed dropdown
    dropdownStyled.addEventListener('click', (e) => {
      e.stopPropagation()
      if (dropdownStyled.classList.contains('active')) {
        dropdownStyled.classList.remove('active')
        dropdownStyled.removeAttribute('aria-expanded')
        dropdownList.style.display = 'none'
      } else {
        dropdownStyled.classList.toggle('active')
        dropdownStyled.setAttribute('aria-expanded', 'true')
        dropdownList.style.display = 'block'
      }
    })
    // events listeners on each option
    const dropdownListOptions = dropdownList.querySelectorAll('li')
    dropdownListOptions.forEach((option) => {
      // option.removeAttribute('aria-selected')
      option.addEventListener('click', (e) => {
        e.stopPropagation()
        // option.setAttribute('aria-selected', 'true')
        this.sortMedia(`${option.getAttribute('rel')}`) // triggers the sortMedia() method when an option is clicked
        dropdownStyled.innerText = option.textContent
        dropdownStyled.classList.remove('active')
        dropdownStyled.removeAttribute('aria-expanded')
        dropdownList.setAttribute('aria-activedescendant', `${option.id}`)
        dropdownList.style.display = 'none'
      })
    })
    this.mainContainer.appendChild(sortContainer)
  }

  displayGallery() {
    // generates and displays the gallery
    if (this.mainContainer.querySelector('.work') === null) {
      // checks the gallery has already been generated
      this.galleryContainer = document.createElement('section')
      this.galleryContainer.className = 'work'
      this.mainContainer.appendChild(this.galleryContainer)
    } else {
      this.galleryContainer.innerHTML = ''
    }
    this.galleryElements.forEach((element) => {
      // iterates the array of media, generates the card and adds it to the container
      const card = document.createElement('figure')
      card.className = 'work__card'
      let html = ''
      switch (element.getType()) {
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
        // event listener that triggers the lightbox
        this.lightbox.init(parseInt(this.galleryElements.indexOf(element), 10))
      })
      const likeBtn = card.querySelector('.like__heart')
      likeBtn.addEventListener('click', () => {
        // event listener that allows the user to like/dislike a media
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
  }

  sortMedia(sortMethod) {
    // sorts the media (duh)
    switch (sortMethod) {
      case 'date':
        this.galleryElements.sort((a, b) => a.getDate() - b.getDate())
        break
      case 'title':
        this.galleryElements.sort((a, b) =>
          a.getTitle().localeCompare(b.getTitle())
        )
        break
      default:
        this.galleryElements.sort((a, b) => b.getLikes() - a.getLikes())
        break
    }
    this.displayGallery()
  }

  getLikesTotal() {
    // gets the total of likes for the photographer's portfolio (no sh*t Sherlock)
    let likes = 0
    this.galleryElements.forEach((element) => {
      likes += element.likes
    })
    return likes
  }
}
