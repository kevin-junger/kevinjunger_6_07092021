import App from "./data/App.js";
import Index from "./display/Index.js";
import Photographer from "./display/Photographer.js";
(function launch() {
  new App("app/data/FishEyeData.json")
    .get()
    .then((data) => {
      if (data === undefined) {
        throw Error();
      }
      const url = new URLSearchParams(window.location.search);
      if (url.has("photographer")) {
        const id = parseInt(url.get("photographer"), 10);
        new Photographer(data, id).displayProfile();
        new Photographer(data, id).displayMedia();
      } else {
        new Index(data).display();
      }
    })
    .catch((error) => {
      console.error(error);
    });
})();
