/**
 * Database
 * Singleton class - fetches and serves the data from a JSON "database"
 */

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
    // fetches the file given to the constructor, interprets the JSON data and returns each dataset as an array
    const response = await fetch(this.data)
    const result = await response.json()
    return {
      photographers: [...result.photographers],
      media: [...result.media],
    }
  }
}
