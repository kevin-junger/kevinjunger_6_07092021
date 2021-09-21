import Photographer from "../data/Photographer.js";
export default class Index {
  constructor(data) {
    if (Index.exists) {
      return Index.instance;
    }
    this.data = data;
    Index.instance = this;
    Index.exists = true;
    return this;
  }
  async display() {
    this.data.photographers.forEach((photographer) => {
      new Photographer(photographer).displayProfile("index")
    });
  }
}
