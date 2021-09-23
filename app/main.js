import App from './core/App.js'
import Index from './display/Index.js'
import Profile from './display/Profile.js'

;(function launch() {
  new App('app/core/FishEyeData.json')
    .get()
    .then((data) => {
      if (data === undefined) {
        throw Error()
      }
      const url = new URLSearchParams(window.location.search)
      if (url.has('profile')) {
        const id = parseInt(url.get('profile'), 10)
        new Profile(data, id).display()
      } else {
        new Index(data).display()
      }
    })
    .catch((error) => {
      console.error(error)
    })
})()
