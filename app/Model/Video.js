export default class Video {
  constructor(data) {
    this.type = 'Video'
    this.setId(data.id)
    this.setPId(data.photographerId)
    this.setTitle(data.title)
    this.setVideo(data.video)
    this.setTags(data.tags)
    this.setLikes(data.likes)
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

  setVideo(video) {
    this.video = video
  }

  setTags(tags) {
    this.tags = tags
  }

  setLikes(likes) {
    this.likes = likes
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

  getVideo() {
    return this.video
  }

  getTags() {
    return this.tags
  }

  getLikes() {
    return this.likes
  }
}
