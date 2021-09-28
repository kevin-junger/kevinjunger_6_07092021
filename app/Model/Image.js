export default class Image {
  constructor(data) {
    this.type = 'Image'
    this.setId(data.id)
    this.setPId(data.photographerId)
    this.setTitle(data.title)
    this.setImage(data.image)
    this.setTags(data.tags)
    this.setLikes(data.likes)
  }

  // setters

  getType() {
    return this.type
  }

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

  setLikes(likes) {
    this.likes = likes
  }

  // getters

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

  getLikes() {
    return this.likes
  }
}