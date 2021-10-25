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
    this.sortMedia()
    this.displayGallery()
  }

  displaySort() {
    /* generates and display the dropdown menu which allows the user to sort the media by popularity, date or name */
    const sortContainer = document.createElement('aside')
    sortContainer.className = 'sort'
    sortContainer.innerHTML = `<label class="sort__method" for="sort-by">Trier par</label>`
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
    const sortSelect = document.createElement('select')
    sortSelect.className = 'sort__select'
    sortSelect.setAttribute('name', 'sort-by')
    sortSelect.setAttribute('id', 'sort-by')
    dropdownOptions.forEach((option) => {
      sortSelect.insertAdjacentHTML(
        'beforeend',
        `<option value="${option.value}">${option.text}</option>`
      )
    })
    sortSelect.addEventListener('change', (e) => {
      e.stopPropagation()
      this.sortMedia(sortSelect.value)
    })
    sortContainer.appendChild(sortSelect)
    this.mainContainer.appendChild(sortContainer)
  }

  displayGallery() {
    // generates and displays the gallery
    if (this.mainContainer.querySelector('.work') === null) {
      // checks the gallery has already been generated
      this.galleryContainer = document.createElement('section')
      this.galleryContainer.className = 'work'
      this.galleryContainer.setAttribute('aria-label', 'galerie')
      this.galleryContainer.setAttribute('tabindex', '0')
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
            <a href="#" class="work__open" aria-labelledby="${element.getId()}">
              <video preload="metadata" class="work__display" id="${element.getId()}" aria-label="video ${element.getTitle()} - cliquer pour afficher">
                <source 
                  src="public/content/media/${element.getPId()}/${element.getVideo()}#t=1"
                  type="video/mp4"
                />
              </video>
            </a>
          `
          break
        default:
          html = `
            <a href="#" class="work__open" aria-labelledby="${element.getId()}">
              <img class="work__display" id="${element.getId()}" src="public/content/media/${element.getPId()}/${element.getImage()}" alt="image ${element.getTitle()} - cliquer pour afficher" />
            </a>
          `
          break
      }
      html += `
        <figcaption class="work__caption">
          <h2 class="work__desc">${element.getTitle()}</h2>
          <div class="work__like like">
            <span class="like__count">${element.getLikes()}</span>
            <button class="like__heart" aria-label="like"><em class="fas fa-heart"></em></button>
          </div>
        </figcaption>
      `
      card.innerHTML = html
      card.querySelector('.work__open').addEventListener('click', () => {
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
