export default class Photographer {
  constructor(data, id) {
    this.profile = data.filter((profile) => profile.id === id)
  }

  async get() {
    return this.profile
  }
}
