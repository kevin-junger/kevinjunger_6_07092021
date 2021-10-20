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
    // main container and dropdown wrapper
    const sortContainer = document.createElement('aside')
    sortContainer.className = 'sort'
    sortContainer.innerHTML = `<span class="sort__method" id="sort__method">Trier par</span>`
    const dropdownWrapper = document.createElement('div')
    dropdownWrapper.className = 'sort__wrapper'
    // options array
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
    // button
    const dropdownBtn = document.createElement('button')
    dropdownBtn.className = 'sort__button'
    dropdownBtn.setAttribute('aria-labelledby', 'sort__method sort__selected')
    dropdownBtn.setAttribute('aria-expanded', 'false')
    dropdownBtn.setAttribute('aria-haspopup', 'listbox')
    dropdownBtn.setAttribute('id', 'sort__selected')
    dropdownBtn.setAttribute('tabindex', '0')
    dropdownBtn.innerText = dropdownOptions[0].text
    // options list
    const dropdownList = document.createElement('ul')
    dropdownList.className = 'sort__list'
    dropdownList.setAttribute('role', 'listbox')
    dropdownList.setAttribute('aria-labelledby', 'sort__method')
    dropdownBtn.setAttribute('id', 'sort__method_list')
    dropdownList.setAttribute('tabindex', '-1')
    dropdownOptions.forEach((option) => {
      dropdownList.insertAdjacentHTML(
        'beforeend',
        `<li id="${option.value}" role="option" tabindex="0">${option.text}</li>`
      )
    })
    // events
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      if (dropdownBtn.classList.contains('active')) {
        dropdownBtn.classList.remove('active')
        dropdownList.style.display = 'none'
        dropdownBtn.setAttribute('aria-expanded', 'false')
      } else {
        dropdownBtn.classList.toggle('active')
        dropdownList.style.display = 'block'
        dropdownBtn.setAttribute('aria-expanded', 'true')
      }
    })
    const dropdownListOptions = dropdownList.querySelectorAll('li')
    dropdownListOptions.forEach((option) => {
      option.addEventListener('click', (e) => {
        e.stopPropagation()
        this.sortMedia(`${option.getAttribute('id')}`)
        dropdownBtn.innerText = option.textContent
        dropdownBtn.classList.remove('active')
        dropdownList.style.display = 'none'
        dropdownBtn.setAttribute('aria-expanded', 'false')
      })
    })
    dropdownListOptions.forEach((option) => {
      option.addEventListener('keydown', (e) => {
        // const optionIndex = dropdownListOptions.indexOf(option)
        switch (e.key) {
          case 'Enter':
            e.stopPropagation()
            this.sortMedia(`${option.getAttribute('id')}`)
            dropdownBtn.innerText = option.textContent
            dropdownBtn.classList.remove('active')
            dropdownList.style.display = 'none'
            dropdownBtn.setAttribute('aria-expanded', 'false')
            // dropdownBtn.focus()
            break
          /* case 'ArrowUp':
            if (optionIndex > 0) {
              option.previousSibling.focus()
            }
            break
          case 'ArrowDown':
            if (optionIndex < dropdownListOptions.length) {
              option.nextSibling.focus()
            }
            break */
          default:
            break
        }
      })
    })
    dropdownWrapper.appendChild(dropdownBtn)
    dropdownWrapper.appendChild(dropdownList)
    sortContainer.appendChild(dropdownWrapper)
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
            <img class="work__display" src="public/content/media/${element.getPId()}/${element.getImage()}" alt="${element.getTitle()}" />
          `
          break
      }
      html += `
        <figcaption class="work__caption">
          <h2 class="work__desc">${element.getTitle()}</h2>
          <div class="work__like like">
            <span class="like__count">${element.getLikes()}</span>
            <span class="like__heart"><i class="fas fa-heart"></i></span>
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
