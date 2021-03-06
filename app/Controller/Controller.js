import Database from './Database.js'
import Index from '../View/Index.js'
import Profile from '../View/Profile.js'

/**
 * Controller
 * Singleton class - controls the display of the views, as its name implies
 */

export default class Controller {
  constructor() {
    if (Controller.exists) {
      return Controller.instance
    }
    Controller.instance = this
    Controller.exists = true
    return this
  }

  init() {
    // fetches the "database", then displays either the Index or the Profile view based on the 'profile' GET paramater in the URL (or its lack thereof)
    new Database('app/Controller/FishEyeData.json').get().then((data) => {
      const url = new URLSearchParams(window.location.search)
      if (url.has('profile') === true) { // checks if the URL has a 'profile' GET parameter
        data.photographers.forEach((element) => {
          if (element.id === parseInt(url.get('profile'), 10)) { // checks if the value stored in the 'profile" GET param corresponds to an existing ID
            this.context = new Profile(element, data.media) // initiates the corresponding profile
            this.context.init()
          }
        })
      } else {
        this.context = new Index(data.photographers)  // initiates the index page with all the photographers
        this.context.init()
      }
    })
  }
}
