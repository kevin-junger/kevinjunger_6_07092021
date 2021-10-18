/**
 * Photographer
 * Model class
 */

export default class Photographer {
  constructor(data) {
    this.setId(data.id)
    this.setName(data.name)
    this.setPortrait(data.portrait)
    this.setLocation(data.city, data.country)
    this.setTagline(data.tagline)
    this.setTags(data.tags)
    this.setPrice(data.price)
  }

  // setters

  setId(id) {
    this.id = id
  }

  setName(name) {
    this.name = name
  }

  setPortrait(portrait) {
    this.portrait = portrait
  }

  setLocation(city, country) {
    this.location = `${city}, ${country}`
  }

  setTagline(tagline) {
    this.tagline = tagline
  }

  setTags(tags) {
    this.tags = tags
  }

  setPrice(price) {
    this.price = `${price}€/jour`
  }

  // getters

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getPortrait() {
    return this.portrait
  }

  getLocation() {
    return this.location
  }

  getTagline() {
    return this.tagline
  }

  getTags() {
    return this.tags
  }

  getPrice() {
    return this.price
  }
}
