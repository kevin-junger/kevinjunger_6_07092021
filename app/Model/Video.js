/**
 * Video
 * Model class - part of the Media Factory
 */

export default class Video {
  constructor(data) {
    this.type = 'Video'
    this.setId(data.id)
    this.setPId(data.photographerId)
    this.setTitle(data.title)
    this.setVideo(data.video)
    this.setTags(data.tags)
    this.setDate(data.date)
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

  setDate(date) {
    this.date = new Date(date)
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

  getDate() {
    return this.date
  }

  getLikes() {
    return this.likes
  }
}
