export default class App {
  constructor() {
    if (App.exists) {
      return App.instance;
    }
    this.data = 'app/data/FishEyeData.json';
    App.instance = this;
    App.exists = true;
    return this;
  }

  async get() {
    const response = await fetch(this.data);
    if (!response.ok) {
      return undefined;
    }
    const result = await response.json();
    return {
      photographers: [...result.photographers],
      media: [...result.media],
      tags: [...result.tags],
    };
  }
}
