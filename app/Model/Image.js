/**
 * Image
 * Model class - part of the Media Factory
 */

export default class Image {
  constructor(data) {
    this.type = 'Image'
    this.setId(data.id)
    this.setPId(data.photographerId)
    this.setTitle(data.title)
    this.setImage(data.image)
    this.setTags(data.tags)
    this.setDate(data.date)
    this.setLikes(data.likes)
    this.setAlt(data.alt)
  }

  // setters

  setId(id) {
    this.id = id
  }

  setPId(pId) {
    this.pId = pId
  }

  setTitle(title) {
    this.title = title
  }

  setImage(image) {
    this.image = image
  }

  setTags(tags) {
    this.tags = tags
  }

  setDate(date) {
    this.date = new Date(date)
  }

  setLikes(likes) {
    this.likes = likes
  }

  setAlt(alt) {
    this.alt = alt
  }

  // getters

  getType() {
    return this.type
  }

  getId() {
    return this.id
  }

  getPId() {
    return this.pId
  }

  getTitle() {
    return this.title
  }

  getImage() {
    return this.image
  }

  getTags() {
    return this.tags
  }

  getDate() {
    return this.date
  }

  getLikes() {
    return this.likes
  }

  getAlt() {
    return this.alt
  }
}
