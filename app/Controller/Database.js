export default class Database {
  constructor(json) {
    if (Database.exists) {
      return Database.instance
    }
    this.data = json
    Database.instance = this
    Database.exists = true
    return this
  }

  async get() {
    const response = await fetch(this.data)
    if (!response.ok) {
      return undefined
    }
    const result = await response.json()
    return {
      photographers: [...result.photographers],
      media: [...result.media],
    }
  }
}
