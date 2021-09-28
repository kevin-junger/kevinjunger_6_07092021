import Database from './Database.js'
import Index from '../View/Index.js'
import Profile from '../View/Profile.js'

export default class Controller {
  constructor() {
    if (Controller.exists) {
      return Controller.instance
    }
    Controller.instance = this
    Controller.exists = true
    return this
  }

  async init() {
    new Database('app/Controller/FishEyeData.json').get().then((data) => {
      if (!data) {
        throw Error()
      }
      const url = new URLSearchParams(window.location.search)
      switch (url.has('profile')) {
        case true:
          data.photographers.forEach((element) => {
            if (element.id === parseInt(url.get('profile'), 10)) {
              this.context = new Profile(element, data.media)
            }
          })
          break
        default:
          this.context = new Index(data.photographers)
          break
      }
      this.context.init()
    })
  }
}
