import Photographer from "../data/Photographer.js";
export default class Profile {
  constructor(data, id) {
    if (Profile.exists) {
      return Profile.instance;
    }
    this.data = data;
    this.id = id;
    Profile.instance = this;
    Profile.exists = true;
    return this;
  }
  display() {
    this.data.photographers.forEach((profile) => {
      if (profile.id === this.id) {
        new Photographer(profile).displayProfile("profile")
        document.querySelector(".container").insertAdjacentHTML("beforeend", '<section class="work"></section>');
        this.data.media.forEach((medium) => {
          if (medium.photographerId === this.id) {
            if (typeof medium.video === "undefined") {
              new Photographer(profile).displayMedium("image", medium)
            } else {
              new Photographer(profile).displayMedium("video", medium)
            }
          }
        });
      }
    });
  }
}
